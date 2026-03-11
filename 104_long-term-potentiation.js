/**
 * Genome Digital - Long-term Potentiation
 * Memory consolidation at synaptic level
 * Added: 11 Mar 2026
 */

class LongTermPotentiation {
  constructor() {
    this.synapticStrength = 0.5;
  }

  strengthen(synapse) {
    this.synapticStrength = Math.min(1, this.synapticStrength + 0.1);
    return { strengthened: synapse, strength: this.synapticStrength };
  }

  weaken(synapse) {
    this.synapticStrength = Math.max(0, this.synapticStrength - 0.1);
    return { weakened: synapse, strength: this.synapticStrength };
  }

  consolidate() {
    return { consolidated: true, strength: this.synapticStrength };
  }
}

module.exports = LongTermPotentiation;
