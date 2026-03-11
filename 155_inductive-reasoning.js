/**
 * Genome Digital - Inductive Reasoning
 * Generalizing from specific observations
 * Added: 11 Mar 2026
 */

class InductiveReasoning {
  constructor() {
    this.observations = [];
    this.hypotheses = [];
    this.confidence = 0.5;
  }

  observe(fact) {
    const observation = {
      id: Date.now(),
      fact,
      timestamp: Date.now()
    };
    
    this.observations.push(observation);
    return observation;
  }

  generalize() {
    if (this.observations.length < 3) {
      return { error: 'Need more observations' };
    }
    
    const hypothesis = this.formHypothesis();
    this.hypotheses.push(hypothesis);
    
    return hypothesis;
  }

  formHypothesis() {
    const facts = this.observations.map(o => o.fact);
    
    const hypothesis = {
      id: Date.now(),
      basedOn: facts.length,
      pattern: this.findPattern(facts),
      confidence: this.calculateConfidence(facts),
      created: Date.now()
    };
    
    return hypothesis;
  }

  findPattern(facts) {
    const types = facts.reduce((acc, f) => {
      const type = typeof f === 'object' ? 'complex' : typeof f;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    return {
      types,
      dominant: Object.entries(types).sort((a, b) => b[1] - a[1])[0]?.[0]
    };
  }

  calculateConfidence(facts) {
    const baseConfidence = Math.min(0.9, facts.length / 10);
    const consistency = this.checkConsistency(facts);
    
    return baseConfidence * consistency;
  }

  checkConsistency(facts) {
    if (facts.length < 2) return 1;
    
    let consistent = 0;
    for (let i = 1; i < facts.length; i++) {
      if (typeof facts[i] === typeof facts[i-1]) {
        consistent++;
      }
    }
    
    return consistent / (facts.length - 1);
  }

  hypothesize(observation) {
    const similar = this.findSimilarObservations(observation);
    const hypothesis = {
      id: Date.now(),
      observation,
      generalization: similar.length > 0 ? this.generalize() : null,
      confidence: similar.length / 10
    };
    
    return hypothesis;
  }

  findSimilarObservations(observation) {
    return this.observations.filter(o => {
      if (typeof observation !== typeof o.fact) return false;
      if (typeof observation === 'object') {
        return JSON.stringify(observation) === JSON.stringify(o.fact);
      }
      return observation === o.fact;
    });
  }

  testHypothesis(hypothesis) {
    const relevantObs = this.observations.filter(o =>
      o.timestamp > hypothesis.created
    );
    
    const supported = relevantObs.filter(o =>
      this.supportsHypothesis(o.fact, hypothesis)
    ).length;
    
    return {
      tested: true,
      total: relevantObs.length,
      supported,
      confidence: supported / (relevantObs.length || 1)
    };
  }

  supportsHypothesis(fact, hypothesis) {
    return Math.random() > 0.3;
  }

  refine(hypothesis, newObservation) {
    this.observe(newObservation);
    
    hypothesis.refined = true;
    hypothesis.refinements = (hypothesis.refinements || 0) + 1;
    hypothesis.confidence = this.calculateConfidence(
      this.observations.map(o => o.fact)
    );
    
    return hypothesis;
  }

  getBestHypothesis() {
    if (this.hypotheses.length === 0) return null;
    
    return this.hypotheses.sort((a, b) => b.confidence - a.confidence)[0];
  }
}

module.exports = InductiveReasoning;
