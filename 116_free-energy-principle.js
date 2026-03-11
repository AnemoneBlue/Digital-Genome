/**
 * Genome Digital - Free Energy Principle
 * Self-organizing systems - Karl Friston's theory implementation
 * Added: 11 Mar 2026
 */

class FreeEnergyPrinciple {
  constructor() {
    this.energy = 1.0;
    this.entropy = 0;
    this.beliefs = new Map();
    this.precision = 0.8;
    this.history = [];
  }

  minimize() {
    const previousEnergy = this.energy;
    this.energy *= 0.9;
    this.entropy = this.calculateEntropy();
    
    this.history.push({
      energy: this.energy,
      entropy: this.entropy,
      timestamp: Date.now()
    });
    
    return {
      energy: this.energy,
      entropy: this.entropy,
      minimized: this.energy < 0.5,
      improvement: previousEnergy - this.energy
    };
  }

  calculateEntropy() {
    return -this.energy * Math.log(this.energy + 0.001);
  }

  getVariationalFreeEnergy() {
    const surprise = -Math.log(this.energy + 0.001);
    const complexity = this.calculateComplexity();
    const accuracy = this.calculateAccuracy();
    
    const vfe = complexity - accuracy + surprise;
    
    return {
      freeEnergy: vfe,
      surprise: surprise,
      complexity: complexity,
      accuracy: accuracy,
      optimized: vfe < 0.5
    };
  }

  calculateComplexity() {
    return Math.log(this.beliefs.size + 1) * 0.1;
  }

  calculateAccuracy() {
    return Math.random() * 0.5 + 0.3;
  }

  updateBeliefs(observation) {
    const prediction = this.predict();
    const error = Math.abs(observation - prediction);
    
    const learningRate = 0.1;
    for (const [key, belief] of this.beliefs) {
      this.beliefs.set(key, belief + (error * learningRate));
    }
    
    return { prediction, error, beliefsUpdated: true };
  }

  predict() {
    let prediction = 0.5;
    for (const [, belief] of this.beliefs) {
      prediction *= belief;
    }
    return prediction;
  }

  actionSelector() {
    const actions = ['perceive', 'act', 'learn', 'remember'];
    const preferences = [0.4, 0.3, 0.2, 0.1];
    
    let random = Math.random();
    for (let i = 0; i < actions.length; i++) {
      random -= preferences[i];
      if (random <= 0) return actions[i];
    }
    return actions[0];
  }
}

module.exports = FreeEnergyPrinciple;
