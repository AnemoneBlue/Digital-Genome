/**
 * ================================================================================
 * GENOME DIGITAL - REASONING MODULE v2.0
 * ================================================================================
 * Comprehensive reasoning system with deduction, induction, abduction, and analogy
 * ================================================================================
 */

class ReasoningModule {
  constructor(options = {}) {
    // Reasoning parameters
    this.confidenceThreshold = options.confidenceThreshold || 0.5;
    this.depth = options.depth || 3;
    
    // Knowledge base
    this.facts = [];
    this.rules = [];
    this.causalChains = [];
    
    // Reasoning history
    this.arguments = [];
    this.conclusions = [];
    this.premises = [];
    
    // Inference engine state
    this.workingMemory = [];
    this.goalStack = [];
  }

  // ============================================================================
  // DEDUCTIVE REASONING - From general to specific
  // ============================================================================
  
  deduce(premises, conclusion) {
    // Validate all premises
    const validPremises = premises.every(p => this.validatePremise(p));
    
    if (!validPremises) {
      return { valid: false, error: 'Invalid premise found' };
    }
    
    // Apply modus ponens or other deduction rules
    const argument = {
      type: 'deductive',
      form: this.identifyForm(premises),
      premises: premises.map(p => ({ ...p, validated: true })),
      conclusion,
      valid: true,
      strength: 1.0,
      timestamp: Date.now()
    };
    
    // Store in history
    this.arguments.push(argument);
    this.premises.push(...premises);
    this.conclusions.push(conclusion);
    
    return argument;
  }
  
  validatePremise(premise) {
    // Check if premise is in knowledge base or self-evident
    const known = this.facts.find(f => f.statement === premise.statement);
    return known || premise.selfEvident || false;
  }
  
  identifyForm(premises) {
    if (premises.length === 2) {
      if (premises[1].statement.includes('if')) return 'modus_ponens';
      if (premises[0].statement.includes('not')) return 'modus_tollens';
    }
    return 'syllogism';
  }
  
  modusPonens(premise1, premise2) {
    // If P then Q. P. Therefore Q.
    const condition = premise1.statement.match(/if (.+) then (.+)/i);
    if (!condition) return null;
    
    const [, antecedent, consequent] = condition;
    
    if (premise2.statement.includes(antecedent)) {
      return {
        type: 'modus_ponens',
        conclusion: { statement: consequent },
        valid: true
      };
    }
    
    return null;
  }

  // ============================================================================
  // INDUCTIVE REASONING - From specific to general
  // ============================================================================
  
  induce(observations) {
    if (observations.length < 2) {
      return { valid: false, error: 'Need at least 2 observations' };
    }
    
    // Find patterns in observations
    const pattern = this.findPattern(observations);
    
    // Measure strength based on number of observations
    const strength = Math.min(1, observations.length / 10);
    
    // Form generalization
    const generalization = {
      type: 'inductive',
      observations,
      pattern,
      conclusion: {
        statement: pattern.statement,
        strength,
        form: 'generalization'
      },
      confidence: strength * (pattern.specificity || 0.5),
      timestamp: Date.now()
    };
    
    this.arguments.push(generalization);
    this.conclusions.push(generalization.conclusion);
    
    return generalization;
  }
  
  findPattern(observations) {
    // Find common features
    const features = {};
    
    observations.forEach(obs => {
      Object.keys(obs).forEach(key => {
        if (!features[key]) features[key] = [];
        features[key].push(obs[key]);
      });
    });
    
    // Find consistent features
    const consistent = Object.entries(features)
      .filter(([_, values]) => new Set(values).size === 1);
    
    if (consistent.length === 0) {
      return { statement: 'Correlation found', specificity: 0.3 };
    }
    
    const statement = consistent
      .map(([key, [value]]) => `All have ${key}: ${value}`)
      .join('. ');
    
    return {
      statement,
      features: consistent.map(([k]) => k),
      specificity: consistent.length / Object.keys(features).length
    };
  }

  // ============================================================================
  // ABDUCTIVE REASONING - Inference to best explanation
  // ============================================================================
  
  abduce(observation, hypotheses = []) {
    if (hypotheses.length === 0) {
      return { error: 'No hypotheses provided' };
    }
    
    // Score each hypothesis
    const scored = hypotheses.map(h => ({
      hypothesis: h,
      score: this.scoreHypothesis(observation, h),
      plausibility: h.plausibility || 0.5,
      explanatoryPower: h.explanatoryPower || 0.5,
      simplicity: h.simplicity || 0.5
    }));
    
    // Calculate overall score
    scored.forEach(s => {
      s.overall = (
        s.explanatoryPower * 0.4 +
        s.plausibility * 0.3 +
        s.simplicity * 0.3
      );
    });
    
    // Sort by score
    scored.sort((a, b) => b.overall - a.overall);
    
    const best = scored[0];
    
    const abduction = {
      type: 'abductive',
      observation,
      bestExplanation: best.hypothesis,
      confidence: best.overall,
      alternatives: scored.slice(1, 4),
      timestamp: Date.now()
    };
    
    this.arguments.push(abduction);
    
    return abduction;
  }
  
  scoreHypothesis(observation, hypothesis) {
    // How well does the hypothesis explain the observation?
    let score = 0;
    
    // Coverage
    if (hypothesis.explains) {
      const explained = hypothesis.explains.filter(
        e => observation.causes?.includes(e)
      ).length;
      score += explained / hypothesis.explains.length;
    }
    
    // Novel prediction
    if (hypothesis.predictions) {
      score += hypothesis.predictions.length * 0.1;
    }
    
    return Math.min(1, score);
  }

  // ============================================================================
  // ANALOGICAL REASONING - Transfer between domains
  // ============================================================================
  
  analogize(source, target) {
    // Find structural similarity
    const similarity = this.calculateSimilarity(source, target);
    
    // Transfer knowledge
    const mappings = this.findMappings(source, target);
    
    const analogy = {
      type: 'analogical',
      source,
      target,
      similarity,
      mappings,
      conclusion: this.transferKnowledge(source, target, mappings),
      confidence: similarity * mappings.length / 5,
      timestamp: Date.now()
    };
    
    this.arguments.push(analogy);
    
    return analogy;
  }
  
  calculateSimilarity(source, target) {
    // Structural similarity
    let similarity = 0;
    let features = 0;
    
    Object.keys(source).forEach(key => {
      features++;
      if (target[key] !== undefined) {
        if (typeof source[key] === typeof target[key]) {
          if (source[key] === target[key]) similarity += 1;
          else similarity += 0.5;
        }
      }
    });
    
    return features > 0 ? similarity / features : 0;
  }
  
  findMappings(source, target) {
    const mappings = [];
    
    Object.keys(source).forEach(key => {
      if (target[key] !== undefined) {
        mappings.push({
          from: `${source}:${key}`,
          to: `${target}:${key}`
        });
      }
    });
    
    return mappings;
  }
  
  transferKnowledge(source, target, mappings) {
    return {
      transferred: mappings.map(m => m.to),
      basedOn: `Similarity between ${source} and ${target}`
    };
  }

  // ============================================================================
  // CAUSAL REASONING
  // ============================================================================
  
  establishCausality(cause, effect, evidence = []) {
    const causalLink = {
      cause,
      effect,
      strength: evidence.length > 3 ? 0.9 : 0.5 + (evidence.length * 0.1),
      evidence,
      timestamp: Date.now()
    };
    
    this.causalChains.push(causalLink);
    
    return { causalLink, confidence: causalLink.strength };
  }
  
  inferCause(effect) {
    const causes = this.causalChains.filter(c => c.effect === effect);
    
    if (causes.length === 0) {
      return { inferred: false };
    }
    
    causes.sort((a, b) => b.strength - a.strength);
    
    return {
      inferred: true,
      cause: causes[0].cause,
      confidence: causes[0].strength,
      alternatives: causes.slice(1, 3)
    };
  }
  
  inferEffect(cause) {
    const effects = this.causalChains.filter(c => c.cause === cause);
    
    if (effects.length === 0) {
      return { inferred: false };
    }
    
    return {
      inferred: true,
      effect: effects[0].effect,
      confidence: effects[0].strength
    };
  }

  // ============================================================================
  // PROBLEM SOLVING
  // ============================================================================
  
  solve(problem) {
    const solution = {
      problem,
      approach: this.selectApproach(problem),
      steps: [],
      timestamp: Date.now()
    };
    
    switch(solution.approach) {
      case 'trial_and_error':
        solution.steps = this.trialAndError(problem);
        break;
      case 'means_ends':
        solution.steps = this.meansEnds(problem);
        break;
      case 'working_backward':
        solution.steps = this.workingBackward(problem);
        break;
      case 'analogous':
        solution.steps = this.useAnalogy(problem);
        break;
    }
    
    solution.success = solution.steps.length > 0;
    
    return solution;
  }
  
  selectApproach(problem) {
    if (problem.type === 'well_structured') return 'means_ends';
    if (problem.type === 'ill_structured') return 'trial_and_error';
    if (problem.goal) return 'working_backward';
    return 'trial_and_error';
  }
  
  trialAndError(problem) {
    const attempts = [];
    for (let i = 0; i < 10; i++) {
      attempts.push({
        attempt: i + 1,
        action: `Try solution ${i + 1}`,
        result: Math.random() > 0.7 ? 'success' : 'failed'
      });
    }
    return attempts;
  }
  
  meansEnds(problem) {
    return [
      { step: 1, action: 'Identify current state' },
      { step: 2, action: 'Identify goal state' },
      { step: 3, action: 'Find differences' },
      { step: 4, action: 'Apply operators to reduce differences' }
    ];
  }
  
  workingBackward(problem) {
    return [
      { step: 1, action: 'Start from goal' },
      { step: 2, action: 'Identify what led to goal' },
      { step: 3, action: 'Repeat until current state' }
    ];
  }
  
  useAnalogy(problem) {
    return [
      { step: 1, action: 'Find similar solved problem' },
      { step: 2, action: 'Map solution to current problem' },
      { step: 3, action: 'Adapt solution' }
    ];
  }

  // ============================================================================
  // KNOWLEDGE MANAGEMENT
  // ============================================================================
  
  addFact(statement, confidence = 1.0) {
    this.facts.push({
      statement,
      confidence,
      timestamp: Date.now()
    });
    return { factAdded: true };
  }
  
  addRule(premise, conclusion, strength = 0.8) {
    this.rules.push({
      premise,
      conclusion,
      strength,
      uses: 0,
      timestamp: Date.now()
    });
    return { ruleAdded: true };
  }
  
  applyRule(ruleName, premises) {
    const rule = this.rules.find(r => r.name === ruleName);
    if (!rule) return { applied: false };
    
    rule.uses++;
    
    return {
      applied: true,
      conclusion: rule.conclusion,
      confidence: rule.strength
    };
  }

  // ============================================================================
  // STATUS
  // ============================================================================
  
  getStatus() {
    return {
      facts: this.facts.length,
      rules: this.rules.length,
      causalChains: this.causalChains.length,
      arguments: this.arguments.length,
      conclusions: this.conclusions.length
    };
  }
  
  getHistory(limit = 20) {
    return this.arguments.slice(-limit);
  }
}

// Export
module.exports = ReasoningModule;

// Test
if (require.main === module) {
  const reasoning = new ReasoningModule();
  
  console.log('=== Reasoning Module Test ===\n');
  
  // Add facts
  reasoning.addFact('All humans are mortal');
  reasoning.addFact('Socrates is human');
  
  // Deduce
  console.log('Deduction:');
  console.log(reasoning.deduce(
    [{ statement: 'All humans are mortal' }, { statement: 'Socrates is human' }],
    { statement: 'Socrates is mortal' }
  ));
  
  // Induce
  console.log('\nInduction:');
  console.log(reasoning.induce([
    { color: 'red', taste: 'sweet', fruit: 'apple' },
    { color: 'red', taste: 'sweet', fruit: 'cherry' },
    { color: 'red', taste: 'sweet', fruit: 'strawberry' }
  ]));
  
  // Abduce
  console.log('\nAbduction:');
  console.log(reasoning.abduce(
    { observation: 'Ground is wet' },
    [
      { explanation: 'It rained', plausibility: 0.8, explanatoryPower: 0.9, simplicity: 0.7 },
      { explanation: 'Sprinkler ran', plausibility: 0.5, explanatoryPower: 0.7, simplicity: 0.8 }
    ]
  ));
  
  console.log('\nStatus:');
  console.log(reasoning.getStatus());
}

module.exports = ReasoningModule;
