/**
 * 😱 Amygdala
 * Emotional processing and fear
 */

class AmygdalaSystem {
  constructor() {
    this.nuclei = this.initializeNuclei();
    this.fearMemory = [];
    this.emotionalResponses = new Map();
  }

  initializeNuclei() {
    return {
      basolateral: {
        name: 'Basolateral Amygdala',
        function: 'emotional memory, sensory input',
        output: 'central nucleus, cortex'
      },
      central: {
        name: 'Central Amygdala',
        function: 'output to brainstem, physiological response',
        output: 'hypothalamus, brainstem'
      },
      cortical: {
        name: 'Cortical Amygdala',
        function: 'olfactory processing',
        output: 'olfactory cortex'
      },
      medial: {
        name: 'Medial Amygdala',
        function: 'social and sexual behavior',
        output: 'hypothalamus'
      }
    };
  }

  // Process emotional stimulus
  processStimulus(stimulus, emotion = 'fear') {
    const processing = {
      stimulus,
      emotion,
      basolateral: this.processEmotion(stimulus),
      central: this.generateResponse(emotion),
      timestamp: Date.now()
    };

    return processing;
  }

  processEmotion(stimulus) {
    return {
      sensoryInput: stimulus,
      evaluation: 'emotional significance',
      memoryStorage: true,
      projection: 'to cortex, thalamus'
    };
  }

  generateResponse(emotion) {
    const responses = {
      fear: {
        physiological: { heartRate: 120, breathing: 20, pupil: 'dilated' },
        behavioral: { freeze: 0.8, flight: 0.15, fight: 0.05 },
        hormonal: 'HPA axis activated'
      },
      anger: {
        physiological: { heartRate: 110, breathing: 16, pupil: 'dilated' },
        behavioral: { freeze: 0.1, flight: 0.1, fight: 0.8 },
        hormonal: 'adrenergic activated'
      },
      joy: {
        physiological: { heartRate: 75, breathing: 14, pupil: 'normal' },
        behavioral: { approach: 0.9, vocalize: 0.7 },
        hormonal: 'dopamine released'
      },
      sadness: {
        physiological: { heartRate: 65, breathing: 12, pupil: 'constricted' },
        behavioral: { withdrawal: 0.8, cry: 0.5 },
        hormonal: 'cortisol baseline'
      }
    };

    return responses[emotion] || responses.fear;
  }

  // Fear conditioning
  fearCondition(conditionedStimulus, unconditionedStimulus) {
    const learning = {
      conditioned: conditionedStimulus,
      unconditioned: unconditionedStimulus,
      acquisition: true,
      amygdalaChange: 'strengthened synapses',
      centralNucleusChange: 'conditioned response pathway',
      freezing: Math.random() * 0.3 + 0.7
    };

    this.fearMemory.push(learning);
    return learning;
  }

  // Fear extinction
  extinguish(conditionedStimulus) {
    return {
      conditioned: conditionedStimulus,
      extinction: true,
      infralimbicInvolved: true,
      newLearning: 'safety',
      suppression: Math.random() * 0.4 + 0.5
    };
  }

  // Threat detection
  detectThreat(stimulus) {
    const threat = Math.random() * 0.3 + 0.5;
    return {
      stimulus,
      threatLevel: threat,
      detected: threat > 0.5,
      response: threat > 0.7 ? 'fight/flight' : threat > 0.5 ? 'freeze' : 'no response',
      amygdalaActivation: threat * 100 + '%'
    };
  }

  // Social emotion processing
  socialEmotion(faces) {
    return {
      faces,
      trust: faces.trust > 0.6,
      fear: faces.fear > 0.5,
      anger: faces.anger > 0.6,
      happiness: faces.happiness > 0.7,
      fusiformFaceArea: true,
      amygdalaResponse: Math.random() * 0.4 + 0.6
    };
  }

  // Emotional memory enhancement
  enhanceMemory(emotion, content) {
    return {
      emotion,
      content,
      memoryEnhanced: emotion === 'fear' || emotion === 'joy',
      enhancement: emotion === 'fear' ? 0.8 : 0.5,
      consolidation: 'amygdala-hippocampus interaction'
    };
  }

  getNucleus(name) {
    return this.nuclei[name];
  }
}

module.exports = new AmygdalaSystem();
