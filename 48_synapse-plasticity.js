/**
 * 🔄 Synapse Plasticity System
 * Synaptic changes and adaptation
 */

class SynapsePlasticitySystem {
  constructor() {
    this.synapses = new Map();
    thisplastictyRules = {
      hebbian: this.hebbianRule.bind(this),
      antiHebbian: this.antiHebbianRule.bind(this),
      oja: this.ojaRule.bind(this),
      BCM: this.bcmRule.bind(this)
    };
  }

  // Create synapse
  createSynapse(preNeuron, postNeuron, initialWeight = 0.5) {
    const id = `${preNeuron}-${postNeuron}`;
    
    this.synapses.set(id, {
      preNeuron,
      postNeuron,
      weight: initialWeight,
      threshold: 0.5,
      lastFired: 0,
      activityHistory: [],
      plasticity: 'hebbian'
    });

    return this.synapses.get(id);
  }

  // Hebbian rule: "Fire together, wire together"
  hebbianRule(preActivity, postActivity, currentWeight, learningRate = 0.01) {
    const delta = learningRate * preActivity * postActivity;
    return Math.min(1, currentWeight + delta);
  }

  // Anti-Hebbian: opposite of Hebbian
  antiHebbianRule(preActivity, postActivity, currentWeight, learningRate = 0.01) {
    const delta = learningRate * preActivity * postActivity;
    return Math.max(0, currentWeight - delta);
  }

  // Oja's rule: normalized Hebbian learning
  ojaRule(preActivity, postActivity, currentWeight, learningRate = 0.01) {
    const delta = learningRate * preActivity * postActivity;
    const normalization = -learningRate * Math.pow(postActivity, 2) * currentWeight;
    return currentWeight + delta + normalization;
  }

  // BCM rule (Bienenstock-Cooper-Munro)
  bcmRule(preActivity, postActivity, currentWeight, learningRate = 0.01, theta = 0.5) {
    const plasticity = postActivity * (postActivity - theta);
    const delta = learningRate * preActivity * plasticity;
    return currentWeight + delta;
  }

  // Update synapse weight
  updateWeight(synapseId, preActivity, postActivity) {
    const synapse = this.synapses.get(synapseId);
    if (!synapse) return null;

    const rule = this.plastictyRules[synapse.plasticity] || this.hebbianRule;
    synapse.weight = rule(preActivity, postActivity, synapse.weight);
    synapse.lastFired = Date.now();
    synapse.activityHistory.push({ preActivity, postActivity, weight: synapse.weight });

    // Keep history limited
    if (synapse.activityHistory.length > 100) {
      synapse.activityHistory.shift();
    }

    return synapse;
  }

  // Spike-Timing-Dependent Plasticity (STDP)
  applySTDP(preBeforePost, deltaT, currentWeight) {
    // If pre fires before post: LTP (strengthen)
    // If post fires before pre: LTD (weaken)
    const tau = 20; // time constant (ms)
    const learningRate = 0.1;

    if (preBeforePost && deltaT > 0) {
      // LTP
      const potentiation = learningRate * Math.exp(-deltaT / tau);
      return Math.min(1, currentWeight + potentiation);
    } else if (!preBeforePost && deltaT < 0) {
      // LTD
      const depression = -learningRate * Math.exp(deltaT / tau);
      return Math.max(0, currentWeight + depression);
    }

    return currentWeight;
  }

  // Homeostatic plasticity - prevent runaway excitation
  applyHomeostatic(synapseId) {
    const synapse = this.synapses.get(synapseId);
    if (!synapse) return null;

    const avgActivity = synapse.activityHistory.reduce((a, b) => a + b.weight, 0) / 
                        synapse.activityHistory.length;

    if (avgActivity > 0.8) {
      // Scale down all weights
      synapse.weight *= 0.9;
    } else if (avgActivity < 0.2) {
      // Scale up weights
      synapse.weight *= 1.1;
    }

    return synapse;
  }

  // Metaplasticity - "plasticity of plasticity"
  setMetaplasticity(synapseId, modulation) {
    const synapse = this.synapses.get(synapseId);
    if (!synapse) return null;

    synapse.learningRate = 0.01 * modulation;
    synapse.threshold *= modulation;

    return synapse;
  }

  // Long-term potentiation (LTP)
  induceLTP(synapseId, protocol = 'tetanus') {
    const synapse = this.synapses.get(synapseId);
    if (!synapse) return null;

    if (protocol === 'tetanus') {
      // High frequency stimulation
      for (let i = 0; i < 100; i++) {
        synapse.weight = Math.min(1, synapse.weight + 0.001);
      }
    } else if (protocol === 'paired') {
      // Paired pulse protocol
      synapse.weight = Math.min(1, synapse.weight + 0.2);
    }

    synapse.ltp = true;
    return synapse;
  }

  // Long-term depression (LTD)
  induceLTD(synapseId, protocol = 'lowFrequency') {
    const synapse = this.synapses.get(synapseId);
    if (!synapse) return null;

    if (protocol === 'lowFrequency') {
      // Low frequency stimulation
      for (let i = 0; i < 900; i++) {
        synapse.weight = Math.max(0, synapse.weight - 0.0001);
      }
    } else if (protocol === 'depulse') {
      synapse.weight = Math.max(0, synapse.weight - 0.15);
    }

    synapse.ltd = true;
    return synapse;
  }

  getSynapse(synapseId) {
    return this.synapses.get(synapseId);
  }

  getAllSynapses() {
    return Array.from(this.synapses.values());
  }

  getPlasticityStats() {
    const weights = Array.from(this.synapses.values()).map(s => s.weight);
    return {
      total: this.synapses.size,
      averageWeight: weights.reduce((a, b) => a + b, 0) / weights.length,
      strongSynapses: weights.filter(w => w > 0.7).length,
      weakSynapses: weights.filter(w => < 0.3).length
    };
  }
}

module.exports = new SynapsePlasticitySystem();
