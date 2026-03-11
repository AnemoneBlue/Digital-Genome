/**
 * Genome Digital - Neurotransmitter Release
 * Synaptic transmission - chemicals across the synapse
 * Added: 11 Mar 2026
 */

class NeurotransmitterRelease {
  constructor() {
    this.released = [];
    this.vesicles = 100;
    this.releaseProbability = 0.3;
  }

  release(neurotransmitter, amount) {
    const vesiclesUsed = Math.min(this.vesicles, Math.ceil(amount / 10));
    this.vesicles -= vesiclesUsed;
    
    const release = {
      neurotransmitter,
      amount,
      vesiclesUsed,
      timestamp: Date.now(),
      success: Math.random() < this.releaseProbability
    };
    
    this.released.push(release);
    
    setTimeout(() => {
      this.vesicles += vesiclesUsed;
    }, 100);
    
    return release;
  }

  reuptake(neurotransmitter) {
    return { reuptaken: true, neurotransmitter };
  }

  degrade(neurotransmitter) {
    return { degraded: true, neurotransmitter };
  }
}

module.exports = NeurotransmitterRelease;
