/**
 * 🔗 Neural Pathways System
 * Brain connectivity and pathways
 */

class NeuralPathwaysSystem {
  constructor() {
    this.pathways = this.initializePathways();
    this.connections = new Map();
  }

  initializePathways() {
    return {
      // Motor pathways
      corticospinal: {
        name: 'Corticospinal Tract',
        from: 'motorCortex',
        to: 'spinalCord',
        type: 'motor',
        speed: 100, // m/s (myelinated)
        function: 'voluntary movement'
      },
      rubrospinal: {
        name: 'Rubrospinal Tract',
        from: 'redNucleus',
        to: 'spinalCord',
        type: 'motor',
        speed: 70,
        function: 'fine motor control'
      },

      // Sensory pathways
      spinothalamic: {
        name: 'Spinothalamic Tract',
        from: 'spinalCord',
        to: 'thalamus',
        type: 'sensory',
        speed: 50,
        function: 'pain, temperature, touch'
      },
      dorsalColumn: {
        name: 'Dorsal Column-Medial Lemniscus',
        from: 'spinalCord',
        to: 'thalamus',
        type: 'sensory',
        speed: 80,
        function: 'proprioception, vibration'
      },

      // Limbic pathways
      mesolimbic: {
        name: 'Mesolimbic Pathway',
        from: 'ventralTegmental',
        to: 'nucleusAccumbens',
        type: 'reward',
        speed: 20,
        function: 'reward, motivation'
      },
      mesocortical: {
        name: 'Mesocortical Pathway',
        from: 'ventralTegmental',
        to: 'prefrontalCortex',
        type: 'cognitive',
        speed: 20,
        function: 'cognition, decision making'
      },

      // Memory pathways
      hippocampal: {
        name: 'Hippocampal Circuit',
        from: 'entorhinal',
        to: 'hippocampus',
        type: 'memory',
        speed: 10,
        function: 'memory formation'
      },
      papez: {
        name: 'Papez Circuit',
        from: 'hippocampus',
        to: 'hypothalamus',
        type: 'emotion',
        speed: 15,
        function: 'emotional memory'
      },

      // Autonomic pathways
      sympathetic: {
        name: 'Sympathetic Pathway',
        from: 'hypothalamus',
        to: 'spinalCord',
        type: 'autonomic',
        speed: 30,
        function: 'fight or flight'
      },
      parasympathetic: {
        name: 'Parasympathetic Pathway',
        from: 'brainstem',
        to: 'organs',
        type: 'autonomic',
        speed: 30,
        function: 'rest and digest'
      },

      // Visual pathway
      retinogeniculate: {
        name: 'Retinogeniculate Pathway',
        from: 'retina',
        to: 'lateralGeniculate',
        type: 'sensory',
        speed: 100,
        function: 'vision'
      },
      geniculocalcarine: {
        name: 'Geniculocalcarine Pathway',
        from: 'lateralGeniculate',
        to: 'visualCortex',
        type: 'sensory',
        speed: 100,
        function: 'visual processing'
      }
    };
  }

  // Signal propagation through pathway
  propagateSignal(pathwayName, signalStrength = 1.0) {
    const pathway = this.pathways[pathwayName];
    if (!pathway) return null;

    const travelTime = 1000 / pathway.speed; // ms for 1 meter
    const attenuation = signalStrength * 0.95; // 5% signal loss per meter

    return {
      pathway: pathway.name,
      from: pathway.from,
      to: pathway.to,
      travelTime,
      attenuation,
      deliveredStrength: signalStrength - attenuation,
      type: pathway.type,
      function: pathway.function
    };
  }

  // Create new pathway
  createPathway(name, from, to, type = 'associative') {
    const id = name.toLowerCase().replace(/\s+/g, '_');
    this.pathways[id] = {
      name,
      from,
      to,
      type,
      speed: 50, // default
      function: 'custom connection'
    };
    return this.pathways[id];
  }

  // Strengthen pathway through use
  strengthenPathway(pathwayName, repetitions = 1) {
    const pathway = this.pathways[pathwayName];
    if (!pathway) return null;

    const strengthIncrease = 0.1 * repetitions;
    pathway.strength = (pathway.strength || 0.5) + strengthIncrease;
    pathway.speed = Math.min(150, pathway.speed * 1.05);

    return {
      newStrength: pathway.strength,
      newSpeed: pathway.speed,
      myelination: pathway.speed > 80
    };
  }

  // Get pathways by type
  getPathwaysByType(type) {
    return Object.entries(this.pathways)
      .filter(([_, p]) => p.type === type)
      .map(([id, p]) => ({ id, ...p }));
  }

  // Pathway efficiency
  getPathwayEfficiency(pathwayName) {
    const pathway = this.pathways[pathwayName];
    if (!pathway) return null;

    return {
      speed: pathway.speed,
      strength: pathway.strength || 0.5,
      reliability: pathway.reliability || 0.9,
      efficiency: (pathway.speed * (pathway.strength || 0.5)) / 100
    };
  }

  getAllPathways() {
    return this.pathways;
  }
}

module.exports = new NeuralPathwaysSystem();
