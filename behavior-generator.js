/**
 * Genome Digital - Behavior Generator Module
 * Generates behaviors from neural activity
 * Added: 12 Mar 2026
 */

class BehaviorGenerator {
  constructor() {
    this.behaviors = {
      idle: { probability: 0.2, motorCommand: 'idle' },
      explore: { probability: 0.15, motorCommand: 'walk' },
      walk: { probability: 0.15, motorCommand: 'walk' },
      fly: { probability: 0.1, motorCommand: 'fly' },
      turn_left: { probability: 0.1, motorCommand: 'turn_left' },
      turn_right: { probability: 0.1, motorCommand: 'turn_right' },
      escape: { probability: 0.05, motorCommand: 'escape' },
      eat: { probability: 0.05, motorCommand: 'idle' },
      rest: { probability: 0.05, motorCommand: 'idle' },
      investigate: { probability: 0.05, motorCommand: 'walk' }
    };
    this.currentBehavior = 'idle';
    this.behaviorHistory = [];
  }

  // Generate behavior from neural activity
  generate(neuralActivity) {
    // Map neural activity level to behavior selection
    let behavior;

    if (neuralActivity.intensity > 0.8) {
      // High activity = escape or intense action
      const highActivityBehaviors = ['escape', 'fly', 'turn_left', 'turn_right'];
      behavior = highActivityBehaviors[Math.floor(Math.random() * highActivityBehaviors.length)];
    } else if (neuralActivity.intensity > 0.5) {
      // Medium activity = walking, exploring
      const mediumActivityBehaviors = ['walk', 'fly', 'explore', 'investigate'];
      behavior = mediumActivityBehaviors[Math.floor(Math.random() * mediumActivityBehaviors.length)];
    } else if (neuralActivity.intensity > 0.2) {
      // Low activity = idle, rest
      const lowActivityBehaviors = ['idle', 'rest', 'explore'];
      behavior = lowActivityBehaviors[Math.floor(Math.random() * lowActivityBehaviors.length)];
    } else {
      behavior = 'idle';
    }

    // Consider emotional state
    if (neuralActivity.emotion === 'fear') {
      behavior = Math.random() > 0.3 ? 'escape' : 'idle';
    } else if (neuralActivity.emotion === 'curiosity') {
      behavior = Math.random() > 0.5 ? 'explore' : 'investigate';
    }

    this.currentBehavior = behavior;

    const result = {
      behavior,
      motorCommand: this.behaviors[behavior].motorCommand,
      intensity: neuralActivity.intensity,
      timestamp: Date.now()
    };

    this.behaviorHistory.push(result);
    return result;
  }

  // Select behavior probabilistically
  selectBehavior() {
    const rand = Math.random();
    let cumulative = 0;

    for (const [name, data] of Object.entries(this.behaviors)) {
      cumulative += data.probability;
      if (rand <= cumulative) {
        return name;
      }
    }

    return 'idle';
  }

  // Get available behaviors
  getBehaviors() {
    return Object.keys(this.behaviors);
  }

  // Get current behavior
  getCurrentBehavior() {
    return this.currentBehavior;
  }

  // Get behavior history
  getHistory() {
    return this.behaviorHistory;
  }

  // Get behavior stats
  getStats() {
    const counts = {};
    this.behaviorHistory.forEach(b => {
      counts[b.behavior] = (counts[b.behavior] || 0) + 1;
    });
    return counts;
  }

  getStatus() {
    return {
      availableBehaviors: Object.keys(this.behaviors).length,
      currentBehavior: this.currentBehavior,
      behaviorsExecuted: this.behaviorHistory.length,
      stats: this.getStats()
    };
  }
}

module.exports = BehaviorGenerator;
