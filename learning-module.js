/**
 * Genome Digital - Learning Module
 * Enables learning from experiences
 * Added: 12 Mar 2026
 */

class LearningModule {
  constructor() {
    this.learnedPatterns = [];
    this.learningHistory = [];
    this.weights = {};
  }

  // Learn from experience
  learn(experience) {
    const pattern = {
      id: Date.now(),
      input: experience.input,
      output: experience.output,
      reward: experience.reward || 0,
      timestamp: Date.now()
    };

    this.learnedPatterns.push(pattern);
    this.updateWeights(pattern);

    this.learningHistory.push({
      type: 'learn',
      pattern: pattern.id,
      timestamp: Date.now()
    });

    return { learned: true, patternId: pattern.id };
  }

  // Update connection weights based on reward
  updateWeights(pattern) {
    const key = `${pattern.input}->${pattern.output}`;
    
    if (!this.weights[key]) {
      this.weights[key] = 0;
    }

    // Hebbian learning: "neurons that fire together, wire together"
    if (pattern.reward > 0) {
      this.weights[key] = Math.min(1, this.weights[key] + 0.1);
    } else {
      this.weights[key] = Math.max(0, this.weights[key] - 0.05);
    }

    return { weight: this.weights[key] };
  }

  // Predict output based on learned patterns
  predict(input) {
    const candidates = this.learnedPatterns.filter(p => p.input === input);
    
    if (candidates.length === 0) {
      return { prediction: null, confidence: 0 };
    }

    // Find best match based on weights
    let best = candidates[0];
    let bestWeight = 0;

    candidates.forEach(candidate => {
      const key = `${candidate.input}->${candidate.output}`;
      if (this.weights[key] > bestWeight) {
        bestWeight = this.weights[key];
        best = candidate;
      }
    });

    return {
      prediction: best.output,
      confidence: bestWeight,
      fromMemory: true
    };
  }

  // Get all learned patterns
  getLearnedPatterns() {
    return this.learnedPatterns;
  }

  // Get learning history
  getHistory() {
    return this.learningHistory;
  }

  // Get weight matrix
  getWeights() {
    return this.weights;
  }

  getStatus() {
    return {
      patternsLearned: this.learnedPatterns.length,
      learningEvents: this.learningHistory.length,
      uniqueConnections: Object.keys(this.weights).length
    };
  }
}

module.exports = LearningModule;
