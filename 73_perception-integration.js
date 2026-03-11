/**
 * Genome Digital - Perception Integration
 * Combines all sensory inputs
 * Added: 11 Mar 2026
 */

class PerceptionIntegration {
  constructor() {
    this.senses = {
      visual: null,
      auditory: null,
      tactile: null,
      olfactory: null,
      gustatory: null
    };
    this.integratedPercept = null;
  }

  receive(sense, data) {
    this.senses[sense] = data;
    return { sense, received: true };
  }

  integrate() {
    const activeSenses = Object.entries(this.senses)
      .filter(([_, data]) => data !== null);
    
    this.integratedPercept = {
      components: activeSenses.length,
      data: Object.fromEntries(activeSenses),
      timestamp: Date.now()
    };
    return this.integratedPercept;
  }

  getUnifiedPercept() {
    return this.integratedPercept;
  }
}

module.exports = PerceptionIntegration;
