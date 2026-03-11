/**
 * Genome Digital - Neural Networks Module
 * Neural network structures inspired by real brain neurons
 */

// Neural Network Types
const NEURAL_TYPES = {
  SENSORY: 'sensory',      // Input from real world
  MOTOR: 'motor',          // Output/action
  INTERNEURON: 'inter',   // Processing
  MEMORY: 'memory'        // Storage
};

// Neuron States
const NEURON_STATES = {
  RESTING: 'resting',
  ACTIVE: 'active',
  INHIBITED: 'inhibited',
  REFRACTORY: 'refractory'
};

/**
 * Create a neuron
 */
function createNeuron(type, id, params = {}) {
  return {
    id,
    type: type || NEURAL_TYPES.INTERNEURON,
    state: NEURON_STATES.RESTING,
    threshold: params.threshold || 0.5,
    potential: params.potential || -70,
    resistance: params.resistance || 10,
    dendrites: [],
    axon: [],
    plasticity: params.plasticity || 0.1,
    weights: {},
    created: new Date().toISOString(),
    activations: 0,
    lastActivation: null
  };
}

/**
 * Create a synapse
 */
function createSynapse(sourceId, targetId, type = 'excitatory') {
  return {
    id: `${sourceId}->${targetId}`,
    source: sourceId,
    target: targetId,
    type,
    weight: 0.5,
    efficacy: 1.0,
    learningRate: 0.01,
    delay: 1,
    lastFired: null
  };
}

/**
 * Neural Network Class
 */
class NeuralNetwork {
  constructor(name) {
    this.name = name;
    this.neurons = new Map();
    this.synapses = new Map();
    this.layers = { input: [], hidden: [], output: [] };
  }
  
  addNeuron(neuron) {
    this.neurons.set(neuron.id, neuron);
    switch(neuron.type) {
      case NEURAL_TYPES.SENSORY: this.layers.input.push(neuron.id); break;
      case NEURAL_TYPES.MOTOR: this.layers.output.push(neuron.id); break;
      default: this.layers.hidden.push(neuron.id);
    }
  }
  
  connect(sourceId, targetId, type = 'excitatory') {
    const synapse = createSynapse(sourceId, targetId, type);
    this.synapses.set(synapse.id, synapse);
    return synapse;
  }
  
  propagate(inputValues) {
    const outputs = {};
    this.layers.input.forEach((id, i) => {
      const neuron = this.neurons.get(id);
      neuron.potential = inputValues[i] || 0;
    });
    this.layers.hidden.forEach(id => {
      const neuron = this.neurons.get(id);
      let sum = 0;
      neuron.dendrites.forEach(synapseId => {
        const synapse = this.synapses.get(synapseId);
        const source = this.neurons.get(synapse.source);
        sum += source.potential * synapse.weight;
      });
      neuron.potential = 1 / (1 + Math.exp(-sum));
      if (neuron.potential > neuron.threshold) {
        neuron.state = NEURON_STATES.ACTIVE;
        neuron.activations++;
      }
    });
    this.layers.output.forEach(id => {
      outputs[id] = this.neurons.get(id).potential;
    });
    return outputs;
  }
  
  toDNA() {
    let dna = '';
    this.neurons.forEach((neuron, id) => {
      const data = JSON.stringify({ t: neuron.type, p: neuron.potential, a: neuron.activations });
      dna += encodeToDNA(data) + '|';
    });
    return dna;
  }
  
  size() { return this.neurons.size; }
}

function encodeToDNA(str) {
  const dna = [];
  for (let i = 0; i < str.length; i++) {
    dna.push(['A', 'T', 'G', 'C'][str.charCodeAt(i) % 4]);
  }
  return dna.join('');
}

module.exports = { NEURAL_TYPES, NEURON_STATES, createNeuron, createSynapse, NeuralNetwork };
