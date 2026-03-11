/**
 * ⚡ Stress Response System
 * Fight or flight and allostatic load
 */

class StressResponseSystem {
  constructor() {
    this.stressLevel = 0;
    this.cortisol = 20; // ng/dL baseline
    this.adrenaline = 50; // pg/mL baseline
    this.allostaticLoad = 0;
    this.stressHistory = [];
  }

  // Acute stress response
  triggerStressor(threat) {
    const response = {
      type: 'acute',
      threat,
      hpaAxis: this.activateHPA(threat),
      sam: this.activateSAM(threat),
      timestamp: Date.now()
    };

    // Physiological changes
    this.stressLevel = Math.min(100, this.stressLevel + 30);
    this.adrenaline *= 2;
    this.cortisol += 10;

    this.stressHistory.push(response);
    return response;
  }

  // Hypothalamic-Pituitary-Adrenal axis
  activateHPA(threat) {
    const hpa = {
      hypothalamus: 'CRH released',
      pituitary: 'ACTH released',
      adrenal: 'cortisol released',
      cortisol: this.cortisol + 15,
      feedback: 'negative loop initiated'
    };

    return hpa;
  }

  // Sympathetic-Adrenal-Medullary system
  activateSAM(threat) {
    const sam = {
      sympathetic: 'activated',
      adrenalMedulla: 'catecholamines released',
      adrenaline: this.adrenaline * 2.5,
      noradrenaline: this.adrenaline * 1.5,
      immediate: true
    };

    return sam;
  }

  // Physiological stress effects
  getPhysiologicalEffects() {
    return {
      cardiovascular: {
        heartRate: 72 + (this.stressLevel * 0.5),
        bloodPressure: 120 + (this.stressLevel * 0.3),
        cardiacOutput: 'increased'
      },
      respiratory: {
        breathingRate: 14 + (this.stressLevel * 0.2),
        bronchodilation: true
      },
      metabolic: {
        glucose: 90 + (this.stressLevel * 0.5),
        metabolism: 'increased',
        fatMobilization: true
      },
      immune: {
        immuneFunction: 'suppressed',
        inflammation: 'increased'
      },
      cognitive: {
        alertness: 'heightened',
        attention: 'focused on threat',
        memory: 'enhanced for threat'
      }
    };
  }

  // Stress recovery
  recovery() {
    const recoveryRate = 0.1;
    this.stressLevel = Math.max(0, this.stressLevel - (this.stressLevel * recoveryRate));
    this.adrenaline *= 0.9;
    this.cortisol *= 0.95;

    return {
      stressLevel: this.stressLevel,
      adrenaline: this.adrenaline,
      cortisol: this.cortisol,
      recovered: this.stressLevel < 10
    };
  }

  // Chronic stress effects
  chronicStress(duration) {
    this.allostaticLoad += duration * 0.1;

    return {
      allostaticLoad: this.allostaticLoad,
      effects: {
        hippocampus: this.allostaticLoad > 50 ? 'atrophy' : 'normal',
        prefrontal: this.allostaticLoad > 30 ? 'impaired' : 'normal',
        amygdala: this.allostaticLoad > 40 ? 'enlarged' : 'normal',
        immune: this.allostaticLoad > 20 ? 'suppressed' : 'normal',
        metabolic: this.allostaticLoad > 60 ? 'dysregulated' : 'normal'
      }
    };
  }

  // Stress management techniques
  manageStress(technique = 'breathing') {
    const techniques = {
      breathing: { reduction: 20, method: 'deep diaphragmatic' },
      meditation: { reduction: 30, method: 'mindfulness' },
      exercise: { reduction: 25, method: 'aerobic' },
      social: { reduction: 15, method: 'support network' },
      cognitive: { reduction: 35, method: 'reappraisal' }
    };

    const techniqueData = techniques[technique];
    this.stressLevel = Math.max(0, this.stressLevel - techniqueData.reduction);

    return {
      technique,
      reduction: techniqueData.reduction,
      newStressLevel: this.stressLevel
    };
  }

  // Perceived stress scale
  perceiveStress(perceived) {
    const perceivedStress = perceived * (this.stressLevel / 50);
    return {
      perceived: perceivedStress,
      objective: this.stressLevel,
      discrepancy: Math.abs(perceivedStress - this.stressLevel)
    };
  }

  getStressLevel() {
    return {
      level: this.stressLevel,
      cortisol: this.cortisol,
      adrenaline: this.adrenaline,
      allostaticLoad: this.allostaticLoad,
      status: this.stressLevel > 70 ? 'critical' : 
              this.stressLevel > 40 ? 'elevated' : 
              'normal'
    };
  }
}

module.exports = new StressResponseSystem();
