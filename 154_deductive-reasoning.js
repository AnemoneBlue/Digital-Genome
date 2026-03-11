/**
 * Genome Digital - Deductive Reasoning
 * Logic-based conclusion drawing
 * Added: 11 Mar 2026
 */

class DeductiveReasoning {
  constructor() {
    this.premises = [];
    this.rules = [];
    this.conclusions = [];
  }

  addPremise(premise) {
    this.premises.push({
      premise,
      added: Date.now()
    });
    return { premise, totalPremises: this.premises.length };
  }

  addRule(name, condition, conclusion) {
    const rule = {
      name,
      condition,
      conclusion,
      used: 0
    };
    
    this.rules.push(rule);
    return rule;
  }

  applyRules() {
    const newConclusions = [];
    
    this.rules.forEach(rule => {
      const satisfied = this.checkCondition(rule.condition);
      
      if (satisfied) {
        const conclusion = this.deriveConclusion(rule.conclusion);
        if (conclusion && !this.conclusions.includes(conclusion)) {
          this.conclusions.push(conclusion);
          rule.used++;
          newConclusions.push(conclusion);
        }
      }
    });
    
    return newConclusions;
  }

  checkCondition(condition) {
    if (typeof condition === 'function') {
      return condition(this.premises.map(p => p.premise));
    }
    
    return this.premises.some(p => 
      JSON.stringify(p.premise).includes(condition)
    );
  }

  deriveConclusion(conclusion) {
    if (typeof conclusion === 'function') {
      return conclusion(this.premises.map(p => p.premise));
    }
    return conclusion;
  }

  syllogism(majorPremise, minorPremise) {
    const conclusion = this.extractSyllogismConclusion(majorPremise, minorPremise);
    
    if (conclusion) {
      this.conclusions.push(conclusion);
    }
    
    return {
      major: majorPremise,
      minor: minorPremise,
      conclusion,
      valid: conclusion !== null
    };
  }

  extractSyllogismConclusion(major, minor) {
    const majorParts = major.split(' are ');
    const minorParts = minor.split(' are ');
    
    if (majorParts.length === 2 && minorParts.length === 2) {
      const middle = majorParts[1];
      const subject = minorParts[0];
      const predicate = majorParts[0];
      
      if (minorParts[1] === middle) {
        return `${subject} are ${predicate}`;
      }
    }
    
    return null;
  }

  modusPonens(condition, implication) {
    if (condition === true) {
      const conclusion = implication.split(' then ')[1];
      return { valid: true, conclusion };
    }
    return { valid: false };
  }

  modusTollens(condition, implication) {
    const consequent = implication.split(' then ')[1];
    
    if (condition === false && condition !== consequent) {
      return { valid: true, conclusion: `${consequent} is false` };
    }
    return { valid: false };
  }

  getConclusions() {
    return this.conclusions;
  }

  clear() {
    this.premises = [];
    this.rules = [];
    this.conclusions = [];
    return { cleared: true };
  }
}

module.exports = DeductiveReasoning;
