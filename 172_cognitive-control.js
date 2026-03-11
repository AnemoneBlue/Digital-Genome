/**
 * Genome Digital - Cognitive Control
 * Executive functions and self-regulation
 * Added: 11 Mar 2026
 */

class CognitiveControl {
  constructor() {
    this.inhibition = 0.7;
    this.updating = 0.7;
    this.shifting = 0.7;
    this.planning = 0.7;
  }

  inhibit(response) {
    const inhibited = Math.random() < this.inhibition;
    return {
      response,
      inhibited,
      effort: inhibited ? 0.3 : 0
    };
  }

  updateWorkingMemory(item, current) {
    const newMemory = [...current];
    newMemory.push(item);
    return newMemory.slice(-7);
  }

  shiftSet(newTask) {
    const success = Math.random() < this.shifting;
    return { task: newTask, shifted: success };
  }

  plan(goal) {
    const steps = Math.floor(Math.random() * 5) + 3;
    return {
      goal,
      steps,
      plan: this.generatePlan(goal, steps),
      complexity: steps > 5 ? 'high' : 'moderate'
    };
  }

  generatePlan(goal, steps) {
    return Array.from({ length: steps }, (_, i) => `Step ${i + 1} for ${goal}`);
  }

  monitor(performance) {
    const errors = performance.errors || 0;
    const adjusted = errors > 2 ? 'reduce_speed' : 'maintain';
    return { errors, adjustment: adjusted };
  }
}

module.exports = CognitiveControl;
