/**
 * Genome Digital - Decision Making Module
 * Evaluates options and makes choices
 * Added: 10 Mar 2026
 */

class DecisionMakingModule {
  constructor() {
    this.decisions = [];
    this.decisionTree = {};
    this.weights = {
      utility: 0.4,
      risk: 0.3,
      emotion: 0.2,
      social: 0.1
    };
  }

  evaluate(options, context = {}) {
    const evaluated = options.map(option => ({
      option,
      score: this.calculateScore(option, context),
      factors: this.analyzeFactors(option, context)
    }));
    
    const decision = {
      options: evaluated,
      chosen: this.selectBest(evaluated),
      context,
      timestamp: Date.now(),
      reasoning: this.explain(evaluated)
    };
    
    this.decisions.push(decision);
    return decision;
  }

  calculateScore(option, context) {
    const utility = Math.random();
    const risk = 1 - Math.random();
    const emotion = context.emotionalState?.valence || 0;
    const social = context.socialFactors || 0;
    
    return (
      utility * this.weights.utility +
      risk * this.weights.risk +
      (emotion + 1) * 0.5 * this.weights.emotion +
      social * this.weights.social
    );
  }

  analyzeFactors(option, context) {
    return {
      pros: this.identifyPros(option),
      cons: this.identifyCons(option),
      risks: this.assessRisks(option),
      opportunities: this.identifyOpportunities(option)
    };
  }

  identifyPros(option) {
    return ['benefit 1', 'benefit 2', 'advantage'].slice(0, Math.floor(Math.random() * 3) + 1);
  }

  identifyCons(option) {
    return ['cost 1', 'drawback'].slice(0, Math.floor(Math.random() * 2) + 1);
  }

  assessRisks(option) {
    return [
      { risk: 'low', probability: Math.random() * 0.3 },
      { risk: 'medium', probability: Math.random() * 0.2 }
    ];
  }

  identifyOpportunities(option) {
    return ['growth potential', 'learning opportunity'].slice(0, Math.floor(Math.random() * 2) + 1);
  }

  selectBest(evaluated) {
    return evaluated.sort((a, b) => b.score - a.score)[0];
  }

  explain(evaluated) {
    const best = this.selectBest(evaluated);
    return `Selected ${best.option} with score ${best.score.toFixed(2)}`;
  }

  makeBinaryChoice(optionA, optionB, context = {}) {
    return this.evaluate([optionA, optionB], context).chosen;
  }

  setWeights(weights) {
    this.weights = { ...this.weights, ...weights };
  }

  getRecentDecisions(count = 10) {
    return this.decisions.slice(-count);
  }
}

module.exports = DecisionMakingModule;
