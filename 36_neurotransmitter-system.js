/**
 * 🧪 Neurotransmitter System
 * Chemical messengers in the brain
 */

class NeurotransmitterSystem {
  constructor() {
    this.neurotransmitters = this.initializeNeurotransmitters();
    this.receptors = new Map();
    this.synapticVesicles = 100; // per synapse
  }

  initializeNeurotransmitters() {
    return {
      glutamate: {
        name: 'Glutamate',
        type: 'excitatory',
        precursor: 'glutamine',
        synthesisRate: 100, // molecules per second
        receptors: ['AMPA', 'NMDA', 'kainate'],
        reuptakeRate: 0.8,
        function: 'learning, memory, excitation'
      },
      GABA: {
        name: 'GABA',
        type: 'inhibitory',
        precursor: 'glutamate',
        synthesisRate: 80,
        receptors: ['GABA-A', 'GABA-B', 'GABA-C'],
        reuptakeRate: 0.7,
        function: 'inhibition, anxiety reduction'
      },
      dopamine: {
        name: 'Dopamine',
        type: 'modulatory',
        precursor: 'tyrosine',
        synthesisRate: 10,
        receptors: ['D1', 'D2', 'D3', 'D4', 'D5'],
        reuptakeRate: 0.9,
        function: 'reward, movement, motivation',
        pathways: ['mesolimbic', 'nigrostriatal', 'mesocortical', 'tuberoinfundibular']
      },
      serotonin: {
        name: 'Serotonin',
        type: 'modulatory',
        precursor: 'tryptophan',
        synthesisRate: 5,
        receptors: ['5-HT1', '5-HT2', '5-HT3', '5-HT4', '5-HT5', '5-HT6', '5-HT7'],
        reuptakeRate: 0.85,
        function: 'mood, sleep, appetite',
        pathways: ['raphe nuclei projections']
      },
      acetylcholine: {
        name: 'Acetylcholine',
        type: 'modulatory',
        precursor: 'choline',
        synthesisRate: 50,
        receptors: ['muscarinic', 'nicotinic'],
        reuptakeRate: 0.6,
        function: 'attention, learning, memory, muscle contraction'
      },
      norepinephrine: {
        name: 'Norepinephrine',
        type: 'modulatory',
        precursor: 'dopamine',
        synthesisRate: 8,
        receptors: ['alpha-1', 'alpha-2', 'beta-1', 'beta-2', 'beta-3'],
        reuptakeRate: 0.8,
        function: 'arousal, attention, fight or flight'
      },
      endorphin: {
        name: 'Endorphins',
        type: 'modulatory',
        precursor: 'proopiomelanocortin',
        synthesisRate: 2,
        receptors: ['mu', 'delta', 'kappa'],
        reuptakeRate: 0.5,
        function: 'pain relief, pleasure, reward'
      },
      oxytocin: {
        name: 'Oxytocin',
        type: 'peptide',
        precursor: 'preprooxytocin',
        synthesisRate: 1,
        receptors: ['OXTR'],
        reuptakeRate: 0.3,
        function: 'bonding, trust, social attachment'
      },
      vasopressin: {
        name: 'Vasopressin',
        type: 'peptide',
        precursor: 'preprovasopressin',
        synthesisRate: 1,
        receptors: ['V1a', 'V1b', 'V2'],
        reuptakeRate: 0.3,
        function: 'water retention, blood pressure, bonding'
      }
    };
  }

  // Release neurotransmitter
  release(neuronType, amount = 100) {
    const nt = this.neurotransmitters[neuronType];
    if (!nt) return null;

    const released = {
      type: neuronType,
      name: nt.name,
      amount,
      receptors: nt.receptors,
      spread: Math.random() * 0.5 + 0.1, // micrometers
      duration: 1000, // ms
      effect: nt.type === 'excitatory' ? 'depolarization' : 'hyperpolarization'
    };

    return released;
  }

  // Receptor binding
  bind(neurotransmitter, receptorType) {
    const nt = this.neurotransmitters[neurotransmitter];
    if (!nt) return null;

    const affinity = nt.receptors.includes(receptorType) ? 0.9 : 0.1;
    const bound = Math.random() < affinity;

    return {
      neurotransmitter,
      receptor: receptorType,
      bound,
      affinity,
      signalStrength: bound ? affinity * 100 : 0
    };
  }

  // Reuptake mechanism
  reuptake(neurotransmitter) {
    const nt = this.neurotransmitters[neurotransmitter];
    if (!nt) return null;

    return {
      neurotransmitter,
      rate: nt.reuptakeRate,
      recycled: nt.synthesisRate * nt.reuptakeRate,
      efficiency: nt.reuptakeRate * 100 + '%'
    };
  }

  // Enzyme degradation
  degrade(neurotransmitter) {
    const enzymes = {
      acetylcholine: 'acetylcholinesterase',
      dopamine: 'MAO, COMT',
      serotonin: 'MAO',
      GABA: 'GABA transaminase',
      glutamate: 'glutamate decarboxylase'
    };

    return {
      neurotransmitter,
      enzyme: enzymes[neurotransmitter] || 'generic',
      rate: 0.1,
      products: neurotransmitter === 'GABA' ? 'succinate' : 'metabolites'
    };
  }

  // Balance regulation
  getBalance() {
    const levels = {};
    for (const [key, nt] of Object.entries(this.neurotransmitters)) {
      levels[key] = nt.synthesisRate / nt.reuptakeRate;
    }
    return levels;
  }

  // Agonist effect
  agonistEffect(neurotransmitter, strength = 1.0) {
    const nt = this.neurotransmitters[neurotransmitter];
    if (!nt) return null;

    return {
      effect: 'increase',
      type: nt.type,
      receptors: nt.receptors,
      strength,
      netEffect: nt.type === 'excitatory' ? strength : -strength
    };
  }

  // Antagonist effect
  antagonistEffect(neurotransmitter, strength = 1.0) {
    const nt = this.neurotransmitters[neurotransmitter];
    if (!nt) return null;

    return {
      effect: 'decrease',
      type: nt.type,
      receptors: nt.receptors,
      strength,
      netEffect: nt.type === 'excitatory' ? -strength : strength
    };
  }

  getNeurotransmitter(name) {
    return this.neurotransmitters[name];
  }

  getAllNeurotransmitters() {
    return this.neurotransmitters;
  }
}

module.exports = new NeurotransmitterSystem();
