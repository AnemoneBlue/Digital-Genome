/**
 * Genome Digital - Counterfactual Thinking
 * Imagining alternatives to reality
 * Added: 11 Mar 2026
 */

class CounterfactualThinking {
  constructor() {
    this.alternatives = [];
    this.mentalSimulations = [];
  }

  imagine(event, variation) {
    const alternative = {
      original: event,
      variation,
      imagined: this.generateAlternative(event, variation),
      timestamp: Date.now()
    };
    
    this.alternatives.push(alternative);
    return alternative;
  }

  generateAlternative(event, variation) {
    const variations = {
      better: `What if ${event} had gone better?`,
      worse: `What if ${event} had gone worse?`,
      different: `What if ${event} had happened differently?`
    };
    
    return variations[variation] || `Alternative to ${event}`;
  }

  simulate(event) {
    const outcomes = [];
    const scenarios = ['best', 'worst', 'likely'];
    
    scenarios.forEach(scenario => {
      outcomes.push({
        scenario,
        outcome: `If ${event}, then ${scenario}`,
        probability: Math.random()
      });
    });
    
    this.mentalSimulations.push({ event, outcomes });
    return outcomes;
  }

  learnFromCounterfactual(actual, imagined) {
    const distance = Math.abs(actual - imagined);
    return {
      actual,
      imagined,
      distance,
      lesson: distance < 0.2 ? 'risk_was_low' : 'outcome_could_vary'
    };
  }

  regret(action) {
    return {
      action,
      imaginedBetter: `If not ${action}, then better outcome`,
      magnitude: Math.random()
    };
  }

  getAlternatives() {
    return this.alternatives;
  }
}

module.exports = CounterfactualThinking;
