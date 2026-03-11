/**
 * 🫀 Organ System
 * Organ connections and coordination
 */

class OrganSystem {
  constructor() {
    this.organs = this.initializeOrgans();
    this.connections = this.initializeConnections();
  }

  initializeOrgans() {
    return {
      brain: {
        name: 'Brain',
        weight: 1400, // grams
        bloodFlow: 750, // mL/min
        oxygenNeed: 50, // mL/min
        functions: ['cognition', 'emotion', 'memory', 'movement', 'homeostasis']
      },
      heart: {
        name: 'Heart',
        weight: 300,
        bloodFlow: 5000,
        oxygenNeed: 25,
        functions: ['pump', 'circulation', 'rhythm']
      },
      lungs: {
        name: 'Lungs',
        weight: 1200,
        bloodFlow: 5000,
        oxygenNeed: 10,
        functions: ['gasExchange', 'filter', 'thermoregulation']
      },
      liver: {
        name: 'Liver',
        weight: 1500,
        bloodFlow: 1500,
        oxygenNeed: 50,
        functions: ['detox', 'metabolism', 'storage', 'protein']
      },
      kidneys: {
        name: 'Kidneys',
        weight: 300,
        bloodFlow: 1200,
        oxygenNeed: 20,
        functions: ['filtration', 'balance', 'hormones']
      },
      stomach: {
        name: 'Stomach',
        weight: 250,
        bloodFlow: 1000,
        oxygenNeed: 5,
        functions: ['digestion', 'acid', 'absorption']
      },
      intestines: {
        name: 'Intestines',
        weight: 2000,
        bloodFlow: 2000,
        oxygenNeed: 30,
        functions: ['absorption', 'digestion', 'immunity']
      },
      pancreas: {
        name: 'Pancreas',
        weight: 100,
        bloodFlow: 200,
        oxygenNeed: 5,
        functions: ['insulin', 'digestion', 'glucose']
      },
      spleen: {
        name: 'Spleen',
        weight: 200,
        bloodFlow: 500,
        oxygenNeed: 5,
        functions: ['immunity', 'bloodFilter', 'storage']
      },
      thyroid: {
        name: 'Thyroid',
        weight: 20,
        bloodFlow: 50,
        oxygenNeed: 1,
        functions: ['metabolism', 'hormones', 'growth']
      }
    };
  }

  initializeConnections() {
    return {
      heartToLungs: { type: 'pulmonary', strength: 1.0 },
      heartToBody: { type: 'systemic', strength: 1.0 },
      brainToHeart: { type: 'neural', strength: 0.9 },
      brainToKidneys: { type: 'neural', strength: 0.7 },
      liverToHeart: { type: 'metabolic', strength: 0.8 },
      kidneysToHeart: { type: 'fluid', strength: 0.85 },
      stomachToIntestines: { type: 'digestive', strength: 1.0 },
      pancreasToIntestines: { type: 'enzymatic', strength: 0.9 },
      thyroidToAll: { type: 'hormonal', strength: 0.8 }
    };
  }

  getOrgan(name) {
    return this.organs[name];
  }

  getAllOrgans() {
    return this.organs;
  }

  getConnection(organ1, organ2) {
    const key = `${organ1}To${organ2.charAt(0).toUpperCase() + organ2.slice(1)}`;
    return this.connections[key] || null;
  }

  simulateOrganFunction(organ, intensity = 1.0) {
    const organData = this.organs[organ];
    if (!organData) return null;

    return {
      organ: organ,
      bloodFlow: organData.bloodFlow * intensity,
      oxygenNeed: organData.oxygenNeed * intensity,
      activity: intensity * 100,
      health: 100 - (Math.random() * 10)
    };
  }

  // Cross-organ communication
  organTalk(source, target, message) {
    const connection = this.getConnection(source, target);
    if (!connection) return null;

    return {
      from: source,
      to: target,
      message,
      strength: connection.strength,
      type: connection.type,
      delay: (1 - connection.strength) * 100 // ms
    };
  }

  // Emergency response coordination
  emergencyResponse(trigger) {
    const responses = {
      fightOrFlight: {
        heart: { rate: 1.5, strength: 1.2 },
        lungs: { rate: 1.5, depth: 1.3 },
        liver: { glucose: 2.0 },
        adrenal: { cortisol: 3.0 }
      },
      restAndDigest: {
        heart: { rate: 0.8, strength: 0.9 },
        lungs: { rate: 0.9, depth: 0.8 },
        liver: { glucose: 1.0 },
        digestion: { active: true }
      }
    };
    return responses[trigger] || {};
  }
}

module.exports = new OrganSystem();
