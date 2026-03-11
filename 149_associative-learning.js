/**
 * Genome Digital - Associative Learning
 * Learning through connection - Pavlovian principles
 * Added: 11 Mar 2026
 */

class AssociativeLearning {
  constructor() {
    this.associations = new Map();
    this.conditioned = [];
    this.unconditioned = [];
  }

  createAssociation(stimulusA, stimulusB, strength = 0.5) {
    const key = `${stimulusA}-${stimulusB}`;
    
    this.associations.set(key, {
      stimulusA,
      stimulusB,
      strength,
      created: Date.now(),
      activated: 0
    });
    
    return { stimulusA, stimulusB, strength };
  }

  condition(unconditionedStimulus, conditionedStimulus) {
    const us = {
      stimulus: unconditionedStimulus,
      type: 'unconditioned',
      response: 'automatic'
    };
    
    const cs = {
      stimulus: conditionedStimulus,
      type: 'conditioned',
      pairedWith: unconditionedStimulus
    };
    
    this.unconditioned.push(us);
    this.conditioned.push(cs);
    
    this.createAssociation(unconditionedStimulus, conditionedStimulus, 0.8);
    
    return { us, cs, paired: true };
  }

  activate(stimulus) {
    const results = [];
    
    for (const [key, assoc] of this.associations) {
      if (assoc.stimulusA === stimulus) {
        assoc.activated++;
        assoc.strength = Math.min(1, assoc.strength + 0.1);
        results.push({ associated: assoc.stimulusB, strength: assoc.strength });
      } else if (assoc.stimulusB === stimulus) {
        assoc.activated++;
        results.push({ associated: assoc.stimulusA, strength: assoc.strength });
      }
    }
    
    return results;
  }

  extinguish(associationKey) {
    const assoc = this.associations.get(associationKey);
    if (assoc) {
      assoc.strength = Math.max(0, assoc.strength - 0.2);
    }
    return assoc;
  }

  getStrongestAssociations(count = 10) {
    return [...this.associations.values()]
      .sort((a, b) => b.strength - a.strength)
      .slice(0, count);
  }

  predict(stimulus) {
    const predictions = this.activate(stimulus);
    return {
      stimulus,
      predictions,
      confidence: predictions.length > 0 
        ? predictions.reduce((s, p) => s + p.strength, 0) / predictions.length 
        : 0
    };
  }
}

module.exports = AssociativeLearning;
