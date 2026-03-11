/**
 * Genome Digital - Abductive Reasoning
 * Inferring best explanation
 * Added: 11 Mar 2026
 */

class AbductiveReasoning {
  constructor() {
    this.explanations = [];
    this.observations = [];
    this.rules = [];
  }

  observe(observation) {
    const obs = {
      id: Date.now(),
      observation,
      timestamp: Date.now()
    };
    
    this.observations.push(obs);
    return obs;
  }

  generateExplanations(observation) {
    const explanations = [];
    
    const possibleCauses = this.findPossibleCauses(observation);
    
    possibleCauses.forEach(cause => {
      const explanation = {
        id: Date.now(),
        observation,
        cause,
        likelihood: this.calculateLikelihood(cause, observation),
        simplicity: this.assessSimplicity(cause),
        explanatoryPower: 0
      };
      
      explanation.score = this.scoreExplanation(explanation);
      explanations.push(explanation);
    });
    
    explanations.sort((a, b) => b.score - a.score);
    this.explanations.push(...explanations);
    
    return explanations;
  }

  findPossibleCauses(observation) {
    const causes = [
      { cause: 'coincidence', probability: 0.1 },
      { cause: 'intentional action', probability: 0.3 },
      { cause: 'natural cause', probability: 0.4 },
      { cause: 'unknown factor', probability: 0.2 }
    ];
    
    return causes;
  }

  calculateLikelihood(cause, observation) {
    return cause.probability * (Math.random() * 0.3 + 0.7);
  }

  assessSimplicity(cause) {
    const complexity = {
      'coincidence': 1,
      'intentional action': 2,
      'natural cause': 2,
      'unknown factor': 3
    };
    
    return 1 / complexity[cause.cause];
  }

  scoreExplanation(explanation) {
    return (explanation.likelihood * 0.6 + explanation.simplicity * 0.4);
  }

  selectBestExplanation(explanations) {
    if (explanations.length === 0) return null;
    if (explanations.length === 1) return explanations[0];
    
    return explanations.sort((a, b) => b.score - a.score)[0];
  }

  infer(observation) {
    const explanations = this.generateExplanations(observation);
    const best = this.selectBestExplanation(explanations);
    
    return {
      observation,
      bestExplanation: best?.cause || 'unknown',
      confidence: best?.score || 0,
      alternatives: explanations.slice(0, 3)
    };
  }

  addRule(premise, conclusion) {
    this.rules.push({ premise, conclusion });
    return { added: true };
  }

  applyRules(observation) {
    const applicable = this.rules.filter(r =>
      JSON.stringify(observation).includes(r.premise)
    );
    
    return applicable.map(r => r.conclusion);
  }
}

module.exports = AbductiveReasoning;
