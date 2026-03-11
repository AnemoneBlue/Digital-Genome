/**
 * Genome Digital - Decision Fatigue
 * Cognitive resource depletion
 * Added: 11 Mar 2026
 */

class DecisionFatigue {
  constructor() {
    this.energy = 100;
    this.decisions = [];
    this.threshold = 30;
  }

  makeDecision(decision) {
    if (this.energy < this.threshold) {
      return {
        decision,
        made: false,
        reason: 'decision_fatigue',
        energy: this.energy,
        suggestion: 'rest_or_defer'
      };
    }
    
    this.energy -= this.calculateCost(decision);
    
    const result = {
      decision,
      made: true,
      energy: this.energy,
      cost: this.calculateCost(decision)
    };
    
    this.decisions.push(result);
    
    return result;
  }

  calculateCost(decision) {
    const complexity = decision.complexity || 'simple';
    const costs = {
      simple: 5,
      moderate: 10,
      complex: 20,
      critical: 30
    };
    
    return costs[complexity] || 5;
  }

  rest(amount = 20) {
    this.energy = Math.min(100, this.energy + amount);
    return { rested: true, energy: this.energy };
  }

  getEnergyLevel() {
    return {
      energy: this.energy,
      percentage: this.energy,
      status: this.energy > 70 ? 'fresh' : 
              this.energy > 30 ? 'tired' : 'exhausted'
    };
  }

  getRecentDecisions(count = 10) {
    return this.decisions.slice(-count);
  }

  optimizeDecisions() {
    const lowEnergy = this.energy < 50;
    
    const recommendations = {
      defer: lowEnergy,
      delegate: this.energy < 30,
      automate: this.decisions.length > 20,
      batch: true
    };
    
    return recommendations;
  }

  recover() {
    this.energy = 100;
    return { recovered: true, energy: 100 };
  }
}

module.exports = DecisionFatigue;
