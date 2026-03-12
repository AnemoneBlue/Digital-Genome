/**
 * Genome Digital - Self Awareness Module
 * Maintains self-model and identity
 * Added: 12 Mar 2026
 */

class SelfAwareness {
  constructor() {
    this.identity = {
      name: 'Genome Digital',
      type: 'digital_mind',
      version: '2.0.0',
      created: new Date('2026-03-11'),
      capabilities: [],
      limitations: []
    };
    this.selfModel = {
      body: null,
      mind: null,
      emotions: null,
      goals: []
    };
    this.beliefs = [];
    this.reflectionHistory = [];
  }

  // Define identity
  defineIdentity(data) {
    Object.assign(this.identity, data);
    return { identityDefined: true };
  }

  // Update self-model with components
  updateSelfModel(component, data) {
    if (component === 'body') {
      this.selfModel.body = data;
    } else if (component === 'mind') {
      this.selfModel.mind = data;
    } else if (component === 'emotions') {
      this.selfModel.emotions = data;
    } else if (component === 'goals') {
      this.selfModel.goals = data;
    }

    return { updated: true, component };
  }

  // Add belief about self
  addBelief(belief) {
    this.beliefs.push({
      id: Date.now(),
      statement: belief,
      confidence: 0.5,
      formedAt: Date.now()
    });

    return { beliefAdded: true };
  }

  // Reflect on self
  reflect(context = {}) {
    const reflection = {
      id: Date.now(),
      timestamp: Date.now(),
      identity: { ...this.identity },
      selfModel: { ...this.selfModel },
      context,
      thoughts: this.generateThoughts()
    };

    this.reflectionHistory.push(reflection);

    return reflection;
  }

  // Generate reflective thoughts
  generateThoughts() {
    const thoughts = [];

    // Think about capabilities
    if (this.identity.capabilities.length > 0) {
      thoughts.push(`I can ${this.identity.capabilities.join(', ')}`);
    }

    // Think about limitations
    if (this.identity.limitations.length > 0) {
      thoughts.push(`I am limited by: ${this.identity.limitations.join(', ')}`);
    }

    // Think about current state
    thoughts.push(`I exist as ${this.identity.type} version ${this.identity.version}`);

    // Think about goals
    if (this.selfModel.goals.length > 0) {
      thoughts.push(`My current goals include: ${this.selfModel.goals.join(', ')}`);
    }

    return thoughts;
  }

  // Evaluate self
  evaluate() {
    const evaluation = {
      identity: this.identity,
      selfModel: this.selfModel,
      beliefCount: this.beliefs.length,
      reflectionCount: this.reflectionHistory.length,
      coherence: this.calculateCoherence()
    };

    return evaluation;
  }

  // Calculate self-coherence
  calculateCoherence() {
    // Simple coherence measure
    let coherence = 0.5;

    if (this.identity.name) coherence += 0.1;
    if (this.selfModel.body) coherence += 0.1;
    if (this.selfModel.mind) coherence += 0.1;
    if (this.beliefs.length > 0) coherence += 0.1;
    if (this.reflectionHistory.length > 0) coherence += 0.1;

    return Math.min(1, coherence);
  }

  // Get identity
  getIdentity() {
    return { ...this.identity };
  }

  // Get self-model
  getSelfModel() {
    return { ...this.selfModel };
  }

  // Get beliefs
  getBeliefs() {
    return this.beliefs;
  }

  // Get reflection history
  getHistory() {
    return this.reflectionHistory;
  }

  getStatus() {
    return {
      identity: this.identity.name,
      version: this.identity.version,
      type: this.identity.type,
      beliefs: this.beliefs.length,
      reflections: this.reflectionHistory.length,
      coherence: this.calculateCoherence()
    };
  }
}

module.exports = SelfAwareness;
