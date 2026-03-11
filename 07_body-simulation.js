/**
 * Genome Digital - Body Simulation Module
 * Complete algorithm that reflects ALL interactions from zygote to maturity
 */

// Constants for phases
const PHASES = {
    ZYGOTE: 'zygote',
    EMBRYO: 'embryo',
    FETUS: 'fetus',
    NEWBORN: 'newborn',
    INFANT: 'infant',
    CHILD: 'child',
    ADOLESCENT: 'adolescent',
    ADULT: 'adult',
    ELDERLY: 'elderly'
};

// Development stages in weeks
const STAGES = {
    ZYGOTE: { weeks: 0, name: 'Zygote' },
    EMBRYO: { weeks: 2, name: 'Embryo' },
    FETUS: { weeks: 8, name: 'Fetus' },
    NEWBORN: { weeks: 40, name: 'Newborn' },
    INFANT: { weeks: 52, name: 'Infant' },
    CHILD: { weeks: 156, name: 'Child' },
    ADOLESCENT: { weeks: 260, name: 'Adolescent' },
    ADULT: { weeks: 1040, name: 'Adult' },
    ELDERLY: { weeks: 4160, name: 'Elderly' }
};

class BodySimulation {
    constructor() {
        this.currentPhase = PHASES.ZYGOTE;
        this.age = 0; // in weeks
        this.organSystems = {};
        this.height = 0; // cm
        this.weight = 0; // kg
        this.energy = 100;
        this.health = 100;
    }

    // Calculate age in different units
    calculateAge(unit = 'weeks') {
        switch(unit) {
            case 'hours': return this.age * 7 * 24;
            case 'days': return this.age * 7;
            case 'weeks': return this.age;
            case 'months': return Math.floor(this.age / 4);
            case 'years': return Math.floor(this.age / 52);
            default: return this.age;
        }
    }

    // Update phase based on age
    updatePhase() {
        if (this.age < 2) this.currentPhase = PHASES.ZYGOTE;
        else if (this.age < 8) this.currentPhase = PHASES.EMBRYO;
        else if (this.age < 40) this.currentPhase = PHASES.FETUS;
        else if (this.age < 52) this.currentPhase = PHASES.NEWBORN;
        else if (this.age < 156) this.currentPhase = PHASES.CHILD;
        else if (this.age < 260) this.currentPhase = PHASES.ADOLESCENT;
        else if (this.age < 1040) this.currentPhase = PHASES.ADULT;
        else this.currentPhase = PHASES.ELDERLY;

        return this.currentPhase;
    }

    // Simulate growth
    grow() {
        this.age++;

        // Height growth (cm per week) - decreases with age
        let heightGrowth = 0;
        if (this.age < 52) heightGrowth = 0.5; // Infant
        else if (this.age < 156) heightGrowth = 0.3; // Child
        else if (this.age < 260) heightGrowth = 0.5; // Adolescent
        else heightGrowth = 0; // Adult

        this.height += heightGrowth;

        // Weight growth
        let weightGain = 0;
        if (this.age < 52) weightGain = 0.15;
        else if (this.age < 156) weightGain = 0.1;
        else if (this.age < 260) weightGain = 0.2;
        else weightGain = 0;

        this.weight += weightGain;

        // Energy and health
        this.energy = Math.min(100, this.energy + 5);
        this.updatePhase();

        return {
            age: this.age,
            phase: this.currentPhase,
            height: this.height.toFixed(1),
            weight: this.weight.toFixed(2)
        };
    }

    // Metabolize nutrients
    metabolize(nutrients) {
        const energyFromFood = nutrients.calories * 0.1;
        this.energy = Math.min(100, this.energy + energyFromFood);

        // Convert excess to weight
        if (energyFromFood > 20) {
            this.weight += (energyFromFood - 20) * 0.001;
        }

        return { energy: this.energy, weight: this.weight };
    }

    // Exercise
    exercise(intensity, duration) {
        const energyBurned = intensity * duration * 0.1;
        this.energy = Math.max(0, this.energy - energyBurned);
        this.weight = Math.max(0, this.weight - intensity * 0.001);

        return { energyBurned, newEnergy: this.energy };
    }

    // Get current status
    getStatus() {
        return {
            phase: this.currentPhase,
            age: {
                weeks: this.age,
                years: this.calculateAge('years'),
                months: this.calculateAge('months')
            },
            height: `${this.height.toFixed(1)} cm`,
            weight: `${this.weight.toFixed(2)} kg`,
            energy: `${this.energy.toFixed(0)}%`,
            health: `${this.health.toFixed(0)}%`
        };
    }

    // Simulate aging
    tick() {
        // Natural aging process
        this.age += 1;

        // Decrease energy with age
        if (this.age > 260) {
            this.energy = Math.max(0, this.energy - 0.1);
        }

        // Decrease health with age
        if (this.age > 1040) {
            this.health = Math.max(0, this.health - 0.05);
        }

        this.updatePhase();

        return this.getStatus();
    }
}

// Helper functions
function createBody() {
    return new BodySimulation();
}

function calculateBMI(weight, heightCm) {
    const heightM = heightCm / 100;
    return weight / (heightM * heightM);
}

function getPhaseInfo(weeks) {
    for (const [phase, info] of Object.entries(STAGES)) {
        if (weeks >= info.weeks) continue;
        return { phase: phase.toLowerCase(), name: info.name };
    }
    return { phase: 'elderly', name: 'Elderly' };
}

module.exports = { PHASES, STAGES, BodySimulation, createBody, calculateBMI, getPhaseInfo };
