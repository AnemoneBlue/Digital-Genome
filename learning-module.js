/**
 * ================================================================================
 * GENOME DIGITAL - LEARNING MODULE v2.0
 * ================================================================================
 * Comprehensive learning system with supervised, unsupervised, and reinforcement
 * ================================================================================
 */

class LearningModule {
  constructor(options = {}) {
    // Learning parameters
    this.learningRate = options.learningRate || 0.1;
    this.discountFactor = options.discountFactor || 0.9;
    this.explorationRate = options.explorationRate || 0.1;
    
    // Knowledge structures
    this.weights = {};              // Neural network-style weights
    this.patterns = [];            // Discovered patterns
    this.rules = [];               // Learned rules
    this.examples = {};            // Training examples by category
    this.predictions = [];         // Prediction history
    
    // Learning history
    this.learningHistory = [];
    this.successCount = 0;
    this.failureCount = 0;
    
    // Hebbian learning: "neurons that fire together, wire together"
    this.associations = {};
    this.hebbianPlasticity = options.hebbianPlasticity || 0.1;
    
    // Experience replay
    this.experienceBuffer = [];
    this.maxBufferSize = options.maxBufferSize || 1000;
  }

  // ============================================================================
  // SUPERVISED LEARNING - Learn from labeled examples
  // ============================================================================
  
  learn(input, output, category = 'general') {
    // Store example
    if (!this.examples[category]) {
      this.examples[category] = [];
    }
    
    const example = {
      id: Date.now(),
      input,
      output,
      timestamp: Date.now(),
      importance: 1.0,
      learned: false
    };
    
    this.examples[category].push(example);
    
    // Update weights based on error
    this.updateWeights(input, output, example);
    
    // Record in history
    this.learningHistory.push({
      type: 'supervised',
      category,
      input: input.substring(0, 50),
      output: output.substring(0, 50),
      timestamp: Date.now()
    });
    
    return {
      learned: true,
      exampleId: example.id,
      category,
      totalExamples: this.examples[category].length
    };
  }
  
  updateWeights(input, output, example) {
    const key = this.getKey(input);
    
    if (!this.weights[key]) {
      this.weights[key] = {
        input,
        output,
        count: 0,
        strength: 0.1,
        lastUpdated: Date.now()
      };
    }
    
    // Strengthen connection
    this.weights[key].count++;
    this.weights[key].strength = Math.min(1, 
      this.weights[key].strength + this.learningRate
    );
    this.weights[key].lastUpdated = Date.now();
    this.weights[key].output = output;
    
    // Hebbian association
    this.associate(input, output);
  }
  
  getKey(input) {
    // Create a simple hash-like key
    return `weight_${input.toLowerCase().substring(0, 20).replace(/\s/g, '_')}`;
  }

  // ============================================================================
  // REINFORCEMENT LEARNING - Learn from rewards/penalties
  // ============================================================================
  
  learnWithReward(state, action, reward, nextState = null) {
    // Add to experience buffer
    this.experienceBuffer.push({
      state,
      action,
      reward,
      nextState,
      timestamp: Date.now()
    });
    
    // Maintain buffer size
    if (this.experienceBuffer.length > this.maxBufferSize) {
      this.experienceBuffer.shift();
    }
    
    // Update value estimate
    const actionKey = `${state}_${action}`;
    
    if (!this.weights[actionKey]) {
      this.weights[actionKey] = { value: 0, count: 0 };
    }
    
    // Q-learning update
    const currentValue = this.weights[actionKey].value;
    const maxNextValue = nextState ? this.getMaxValue(nextState) : 0;
    
    const tdError = reward + this.discountFactor * maxNextValue - currentValue;
    this.weights[actionKey].value += this.learningRate * tdError;
    this.weights[actionKey].count++;
    
    // Track success/failure
    if (reward > 0) {
      this.successCount++;
    } else {
      this.failureCount++;
    }
    
    return {
      learned: true,
      action: actionKey,
      reward,
      newValue: this.weights[actionKey].value,
      tdError
    };
  }
  
  getMaxValue(state) {
    // Find maximum value for any action in this state
    let maxVal = 0;
    Object.keys(this.weights).forEach(key => {
      if (key.startsWith(state)) {
        maxVal = Math.max(maxVal, this.weights[key].value || 0);
      }
    });
    return maxVal;
  }
  
  getBestAction(state) {
    // Choose best action using epsilon-greedy
    if (Math.random() < this.explorationRate) {
      // Explore: random action
      return { action: 'explore', type: 'random' };
    }
    
    // Exploit: best known action
    let bestAction = null;
    let bestValue = -Infinity;
    
    Object.keys(this.weights).forEach(key => {
      if (key.startsWith(state)) {
        if (this.weights[key].value > bestValue) {
          bestValue = this.weights[key].value;
          bestAction = key.replace(state, '').replace('_', '');
        }
      }
    });
    
    return {
      action: bestAction || 'unknown',
      value: bestValue,
      type: 'exploited'
    };
  }

  // ============================================================================
  // UNSUPERVISED LEARNING - Find patterns
  // ============================================================================
  
  findPatterns(data) {
    const patterns = [];
    const dataStr = JSON.stringify(data);
    
    // Simple n-gram pattern detection
    const ngrams = this.extractNgrams(dataStr, 3);
    
    ngrams.forEach(ngram => {
      const existing = this.patterns.find(p => p.sequence === ngram);
      
      if (existing) {
        existing.count++;
        existing.frequency = existing.count / this.learningHistory.length;
      } else {
        this.patterns.push({
          sequence: ngram,
          count: 1,
          frequency: 1 / this.learningHistory.length,
          discoveredAt: Date.now()
        });
      }
    });
    
    // Return significant patterns
    return this.patterns
      .filter(p => p.frequency > 0.1)
      .sort((a, b) => b.count - a.count);
  }
  
  extractNgrams(text, n) {
    const ngrams = [];
    for (let i = 0; i <= text.length - n; i++) {
      ngrams.push(text.substring(i, i + n));
    }
    return ngrams;
  }

  // ============================================================================
  // HEBBIAN LEARNING - Associations
  // ============================================================================
  
  associate(concept1, concept2, strength = null) {
    const key = this.getAssociationKey(concept1, concept2);
    
    if (!this.associations[key]) {
      this.associations[key] = {
        concepts: [concept1, concept2],
        strength: strength || 0.5,
        count: 1,
        createdAt: Date.now()
      };
    } else {
      // Hebbian update: strengthen association
      const assoc = this.associations[key];
      assoc.strength = Math.min(1, assoc.strength + this.hebbianPlasticity);
      assoc.count++;
    }
    
    return { associated: true };
  }
  
  getAssociationKey(c1, c2) {
    const sorted = [c1, c2].sort();
    return `assoc_${sorted[0].substring(0, 10)}_${sorted[1].substring(0, 10)}`;
  }
  
  getAssociated(concept) {
    return Object.values(this.associations)
      .filter(a => a.concepts.includes(concept))
      .sort((a, b) => b.strength - a.strength);
  }

  // ============================================================================
  // RULE LEARNING - Extract if-then rules
  // ============================================================================
  
  learnRule(condition, conclusion, confidence = 0.5) {
    const rule = {
      id: Date.now(),
      condition,
      conclusion,
      confidence,
      uses: 0,
      successes: 0,
      createdAt: Date.now()
    };
    
    this.rules.push(rule);
    
    return { ruleLearned: true, ruleId: rule.id };
  }
  
  applyRule(condition) {
    // Find matching rules
    const matchingRules = this.rules.filter(rule => {
      return rule.condition.toLowerCase().includes(condition.toLowerCase());
    });
    
    if (matchingRules.length === 0) {
      return { applied: false, reason: 'no_matching_rules' };
    }
    
    // Choose best rule
    matchingRules.sort((a, b) => b.confidence - a.confidence);
    const bestRule = matchingRules[0];
    
    // Update rule statistics
    bestRule.uses++;
    
    return {
      applied: true,
      conclusion: bestRule.conclusion,
      confidence: bestRule.confidence,
      ruleId: bestRule.id
    };
  }

  // ============================================================================
  // PREDICTION - Predict based on learned patterns
  // ============================================================================
  
  predict(input) {
    // Check learned weights first
    const key = this.getKey(input);
    if (this.weights[key]) {
      return {
        prediction: this.weights[key].output,
        confidence: this.weights[key].strength,
        source: 'weights'
      };
    }
    
    // Try applying rules
    const ruleResult = this.applyRule(input);
    if (ruleResult.applied) {
      return {
        prediction: ruleResult.conclusion,
        confidence: ruleResult.confidence,
        source: 'rules'
      };
    }
    
    // Check associations
    const associated = this.getAssociated(input);
    if (associated.length > 0) {
      return {
        prediction: associated[0].concepts.find(c => c !== input),
        confidence: associated[0].strength,
        source: 'association'
      };
    }
    
    return { prediction: null, confidence: 0 };
  }

  // ============================================================================
  // LEARNING FROM EXPERIENCE - Batch learning
  // ============================================================================
  
  learnFromExperience(sampleSize = 10) {
    // Sample from experience buffer
    const samples = [];
    const buffer = [...this.experienceBuffer];
    
    for (let i = 0; i < Math.min(sampleSize, buffer.length); i++) {
      const idx = Math.floor(Math.random() * buffer.length);
      samples.push(buffer[idx]);
    }
    
    // Learn from each sample
    const results = samples.map(sample => {
      return this.learnWithReward(
        sample.state,
        sample.action,
        sample.reward,
        sample.nextState
      );
    });
    
    return {
      learned: results.length,
      results
    };
  }

  // ============================================================================
  // FORGETTING - Reduce importance of rarely used knowledge
  // ============================================================================
  
  prune(importanceThreshold = 0.1) {
    let pruned = { weights: 0, patterns: 0, rules: 0, associations: 0 };
    
    // Prune weak weights
    const weightKeys = Object.keys(this.weights);
    weightKeys.forEach(key => {
      if (this.weights[key].strength < importanceThreshold) {
        delete this.weights[key];
        pruned.weights++;
      }
    });
    
    // Prune rare patterns
    this.patterns = this.patterns.filter(p => p.frequency > importanceThreshold);
    pruned.patterns = 0; // Already filtered
    
    // Prune weak rules
    this.rules = this.rules.filter(r => r.confidence > importanceThreshold);
    pruned.rules = this.rules.length;
    
    return pruned;
  }

  // ============================================================================
  // STATUS AND STATISTICS
  // ============================================================================
  
  getStatus() {
    return {
      totalWeights: Object.keys(this.weights).length,
      patterns: this.patterns.length,
      rules: this.rules.length,
      associations: Object.keys(this.associations).length,
      examples: Object.values(this.examples).reduce((sum, arr) => sum + arr.length, 0),
      experienceBuffer: this.experienceBuffer.length,
      successRate: this.successCount + this.failureCount > 0 
        ? (this.successCount / (this.successCount + this.failureCount) * 100).toFixed(1) + '%'
        : 'N/A'
    };
  }
  
  getLearningHistory(limit = 20) {
    return this.learningHistory.slice(-limit);
  }
  
  getKnowledge() {
    return {
      weights: this.weights,
      patterns: this.patterns.filter(p => p.frequency > 0.1),
      rules: this.rules,
      associations: this.associations
    };
  }

  // ============================================================================
  // EXPORT/IMPORT
  // ============================================================================
  
  export() {
    return {
      weights: this.weights,
      patterns: this.patterns,
      rules: this.rules,
      associations: this.associations,
      statistics: this.getStatus(),
      exportedAt: Date.now()
    };
  }
  
  import(data) {
    if (data.weights) this.weights = data.weights;
    if (data.patterns) this.patterns = data.patterns;
    if (data.rules) this.rules = data.rules;
    if (data.associations) this.associations = data.associations;
    return { imported: true };
  }
}

// Export
module.exports = LearningModule;

// Test
if (require.main === module) {
  const learning = new LearningModule();
  
  console.log('=== Learning Module Test ===\n');
  
  // Supervised learning
  learning.learn('sky', 'blue', 'colors');
  learning.learn('grass', 'green', 'colors');
  learning.learn('blood', 'red', 'colors');
  
  // Prediction
  console.log('Predict "sky":');
  console.log(learning.predict('sky'));
  
  // Reinforcement learning
  console.log('\nRL Learning:');
  console.log(learning.learnWithReward('state1', 'action1', 1, 'state2'));
  console.log(learning.learnWithReward('state1', 'action2', -1, 'state3'));
  
  // Get best action
  console.log('\nBest action for state1:');
  console.log(learning.getBestAction('state1'));
  
  // Status
  console.log('\nStatus:');
  console.log(learning.getStatus());
}

module.exports = LearningModule;
