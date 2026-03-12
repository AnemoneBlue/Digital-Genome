/**
 * Genome Digital - Decision Making Module
 * Makes decisions based on goals, values, and context
 * Added: 12 Mar 2026
 */

class DecisionMaking {
  constructor() {
    this.currentDecision = null;
    this.decisionHistory = [];
    this.goals = [];
    this.values = {
      survival: 0.9,
      hunger: 0.7,
      curiosity: 0.6,
      social: 0.5,
      safety: 0.8
    };
  }

  // Add a goal
  addGoal(goal) {
    this.goals.push({
      id: Date.now(),
      description: goal.description,
      priority: goal.priority || 0.5,
      achieved: false,
      createdAt: Date.now()
    });

    return { goalAdded: true, totalGoals: this.goals.length };
  }

  // Make a decision
  decide(options) {
    const evaluated = options.map(option => {
      const score = this.evaluateOption(option);
      return {
        option,
        score,
        reasons: score.reasons
      };
    });

    // Sort by score
    evaluated.sort((a, b) => b.score.total - a.score.total);

    const decision = {
      chosen: evaluated[0].option,
      options: evaluated,
      timestamp: Date.now()
    };

    this.currentDecision = decision;
    this.decisionHistory.push(decision);

    return decision;
  }

  // Evaluate a single option
  evaluateOption(option) {
    const scores = {};
    let total = 0;

    // Calculate value alignment
    if (option.values) {
      Object.entries(option.values).forEach(([key, value]) => {
        const alignment = Math.abs(this.values[key] - value);
        scores[key] = 1 - alignment;
        total += scores[key] * (this.values[key] || 0.5);
      });
    }

    // Calculate goal alignment
    if (this.goals.length > 0) {
      const goalScore = this.goals.filter(g => 
        option.description && option.description.includes(g.description)
      ).length / this.goals.length;
      
      scores.goalAlignment = goalScore;
      total += goalScore * 0.4;
    }

    // Calculate risk
    if (option.risk !== undefined) {
      scores.safety = 1 - option.risk;
      total += scores.safety * this.values.safety;
    }

    // Calculate expected outcome
    if (option.expectedValue) {
      scores.expectedValue = option.expectedValue;
      total += option.expectedValue * 0.3;
    }

    return {
      total: total / Object.keys(scores).length,
      breakdown: scores,
      reasons: Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([k, v]) => `${k}: ${(v * 100).toFixed(0)}%`)
    };
  }

  // Update values (learning)
  updateValues(feedback) {
    if (feedback.value && feedback.outcome > 0) {
      this.values[feedback.value] = Math.min(1, this.values[feedback.value] + 0.1);
    } else if (feedback.value && feedback.outcome < 0) {
      this.values[feedback.value] = Math.max(0, this.values[feedback.value] - 0.1);
    }

    return { updated: true, values: { ...this.values } };
  }

  // Get current goals
  getGoals() {
    return this.goals;
  }

  // Get decision history
  getHistory() {
    return this.decisionHistory;
  }

  // Get current values
  getValues() {
    return { ...this.values };
  }

  getStatus() {
    return {
      currentDecision: this.currentDecision ? 'made' : 'none',
      decisionsMade: this.decisionHistory.length,
      activeGoals: this.goals.filter(g => !g.achieved).length,
      values: { ...this.values }
    };
  }
}

module.exports = DecisionMaking;
