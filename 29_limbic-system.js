/**
 * 🧠 Limbic System
 * Emotion and memory processing
 */

class LimbicSystem {
  constructor() {
    this.components = this.initializeComponents();
  }

  initializeComponents() {
    return {
      amygdala: {
        name: 'Amygdala',
        function: 'emotional processing, fear, reward',
        size: '~3g',
        neurons: '12 million',
        keyRole: 'emotional salience detection'
      },
      hippocampus: {
        name: 'Hippocampus',
        function: 'memory formation, spatial navigation',
        size: '~5g',
        neurons: '1.5 million',
        keyRole: 'declarative memory consolidation'
      },
      hypothalamus: {
        name: 'Hypothalamus',
        function: 'homeostasis, hormones, drives',
        size: '~4g',
        neurons: '10 million',
        keyRole: 'link between nervous and endocrine'
      },
      cingulateGyrus: {
        name: 'Cingulate Gyrus',
        function: 'emotion, pain, attention',
        size: '~6g',
        neurons: '6 million',
        keyRole: 'emotional awareness'
      },
      olfactoryBulb: {
        name: 'Olfactory Bulb',
        function: 'smell processing',
        size: '~0.15g',
        neurons: '6 million',
        keyRole: 'initial smell processing'
      },
      fornix: {
        name: 'Fornix',
        function: 'memory pathway',
        size: 'fiber tract',
        neurons: 'N/A',
        keyRole: 'hippocampus to mammillary bodies'
      },
      mammillaryBodies: {
        name: 'Mammillary Bodies',
        function: 'memory processing',
        size: '~0.5g',
        neurons: 'N/A',
        keyRole: 'part of Papez circuit'
      }
    };
  }

  // Process emotional stimulus
  processEmotion(stimulus, type = 'fear') {
    const processing = {
      stimulus,
      type,
      amygdala: this.amygdalaResponse(type),
      hippocampus: this.hippocampusEncoding(stimulus),
      hypothalamus: this.hypothalamusResponse(type),
      timestamp: Date.now()
    };

    return processing;
  }

  amygdalaResponse(emotion) {
    const responses = {
      fear: { activation: 0.9, memoryPriority: 'high', behavior: 'avoidance' },
      anger: { activation: 0.8, memoryPriority: 'high', behavior: 'confrontation' },
      joy: { activation: 0.7, memoryPriority: 'medium', behavior: 'approach' },
      sadness: { activation: 0.5, memoryPriority: 'medium', behavior: 'withdrawal' },
      disgust: { activation: 0.8, memoryPriority: 'low', behavior: 'avoidance' }
    };

    return responses[emotion] || { activation: 0.5, memoryPriority: 'low', behavior: 'neutral' };
  }

  hippocampusEncoding(experience) {
    return {
      encoding: 'active',
      consolidation: 'in progress',
      episodicMemory: true,
      spatialMemory: true,
      patternSeparation: Math.random() * 0.5 + 0.5,
      patternCompletion: Math.random() * 0.3 + 0.3
    };
  }

  hypothalamusResponse(emotion) {
    return {
      autonomic: emotion === 'fear' || emotion === 'anger' ? 'sympathetic' : 'parasympathetic',
      endocrine: 'HPA axis ' + (emotion === 'fear' || emotion === 'anger' ? 'activated' : 'baseline'),
      drive: emotion === 'hunger' ? 'feeding' : 'none'
    };
  }

  // Papez circuit (emotional memory)
  papezCircuit() {
    return {
      pathway: ['hippocampus', 'fornix', 'mammillary bodies', 'thalamus', 'cingulate', 'back to hippocampus'],
      function: 'emotional memory consolidation',
      keyStructures: 5,
      keyNeurotransmitter: 'acetylcholine'
    };
  }

  // Fear conditioning
  fearConditioning(stimulus, reinforcement = 1.0) {
    return {
      conditionedStimulus: stimulus,
      conditionedResponse: 'fear',
      amygdalaPlasticity: 'enhanced',
      hippocampusEncoding: 'strong',
      generalization: Math.random() * 0.3,
      extinction: false
    };
  }

  // Stress effect on limbic system
  stressEffect(cortisol) {
    return {
      amygdala: cortisol > 20 ? 'enlarged, hyperactive' : 'normal',
      hippocampus: cortisol > 25 ? 'atrophy, memory impaired' : 'normal',
      prefrontal: cortisol > 30 ? 'impaired connectivity' : 'normal',
      chronicStress: cortisol > 20
    };
  }

  getComponent(name) {
    return this.components[name];
  }
}

module.exports = new LimbicSystem();
