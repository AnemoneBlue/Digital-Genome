/**
 * Genome Digital - Active Inference
 * Minimizing surprise through action - the free energy principle
 * Added: 11 Mar 2026
 */

class ActiveInference {
  constructor() {
    this.surprise = 0;
    this.freeEnergy = 0;
    this.beliefs = new Map();
    this.preferences = new Map();
    this.precision = 0.8;
  }

  infer(observation) {
    const surprise = this.calculateSurprise(observation);
    this.surprise = surprise;
    
    const inference = {
      observation,
      surprise,
      surpriseLevel: surprise < 0.1 ? 'low' : surprise < 0.3 ? 'medium' : 'high',
      action: this.selectAction(surprise),
      timestamp: Date.now()
    };
    
    return inference;
  }

  calculateSurprise(observation) {
    const expected = this.getExpected();
    const surprise = Math.abs(observation - expected);
    return Math.min(1, surprise);
  }

  getExpected() {
    let expected = 0.5;
    for (const [, belief] of this.beliefs) {
      expected *= belief;
    }
    return expected;
  }

  selectAction(surprise) {
    if (surprise > 0.5) {
      return 'explore';
    } else if (surprise > 0.2) {
      return 'adapt';
    }
    return 'exploit';
  }

  minimizeSurprise() {
    this.freeEnergy = this.calculateFreeEnergy();
    
    const actions = ['sample', 'explore', 'infer', 'act'];
    let bestAction = actions[0];
    let minFE = Infinity;
    
    for (const action of actions) {
      const fe = this.estimateFreeEnergy(action);
      if (fe < minFE) {
        minFE = fe;
        bestAction = action;
      }
    }
    
    this.freeEnergy = minFE;
    
    return {
      action: bestAction,
      freeEnergy: minFE,
      minimized: true
    };
  }

  calculateFreeEnergy() {
    return this.surprise + this.precision * 0.1;
  }

  estimateFreeEnergy(action) {
    return Math.random() * 0.5;
  }

  updateBelief(key, value) {
    this.beliefs.set(key, value);
    return { key, value, beliefsUpdated: true };
  }

  setPreference(key, preference) {
    this.preferences.set(key, preference);
    return { key, preference, set: true };
  }
}

module.exports = ActiveInference;
