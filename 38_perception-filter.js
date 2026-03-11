/**
 * Genome Digital - Perception Filter
 * Filters and modulates sensory input based on state
 * Added: 7 Mar 2026
 */

class PerceptionFilter {
  constructor() {
    // Attention weights for different types of information
    this.weights = {
      emotional: 0.5,
      logical: 0.5,
      sensory: 0.5,
      social: 0.5,
      temporal: 0.5
    };
    
    // Filters for different conditions
    this.filters = {
      positive: { threshold: 0.3, multiplier: 1.2 },
      negative: { threshold: 0.3, multiplier: 1.5 },
      neutral: { threshold: 0.5, multiplier: 1.0 }
    };
    
    // State-dependent modulation
    this.state = 'normal'; // normal, focused, distracted, stressed, relaxed
    this.filterHistory = [];
  }

  // Process input through perception filters
  process(input, emotionalState) {
    // Adjust weights based on emotional state
    this.adjustWeights(emotionalState);
    
    // Apply state-dependent filtering
    let processed = this.applyStateFilter(input);
    
    // Calculate attention score
    const attentionScore = this.calculateAttention(input, emotionalState);
    
    // Filter emotional content
    const emotionalFiltered = this.filterEmotional(input, emotionalState);
    
    // Determine what's salient (worthy of attention)
    const salient = this.extractSalient(input, attentionScore);
    
    const result = {
      original: input,
      processed,
      attentionScore,
      salient,
      weights: { ...this.weights },
      state: this.state,
      timestamp: Date.now()
    };
    
    this.filterHistory.push(result);
    if (this.filterHistory.length > 50) {
      this.filterHistory.shift();
    }
    
    return result;
  }

  adjustWeights(emotionalState) {
    // Increase attention to emotional content when emotional
    const totalEmotion = emotionalState.joy + emotionalState.fear + 
                         emotionalState.sadness + emotionalState.anger;
    
    if (totalEmotion > 0.6) {
      this.weights.emotional = Math.min(1, 0.5 + totalEmotion * 0.3);
      this.weights.logical = Math.max(0.1, 0.5 - totalEmotion * 0.2);
    } else if (totalEmotion < 0.2) {
      this.weights.emotional = 0.3;
      this.weights.logical = 0.7;
    }
    
    // Adjust for specific emotions
    if (emotionalState.fear > 0.5) {
      this.weights.sensory = 0.9; // Heightened awareness
    }
    
    if (emotionalState.joy > 0.6) {
      this.weights.social = 0.8; // More socially attuned
    }
  }

  applyStateFilter(input) {
    switch (this.state) {
      case 'focused':
        return this.applyFocusedFilter(input);
      case 'distracted':
        return this.applyDistractedFilter(input);
      case 'stressed':
        return this.applyStressedFilter(input);
      case 'relaxed':
        return this.applyRelaxedFilter(input);
      default:
        return input;
    }
  }

  applyFocusedFilter(input) {
    // Focus amplifies important info, suppresses distractions
    return {
      ...input,
      content: input.content || '',
      importance: (input.importance || 0.5) * 1.5,
      filtered: false
    };
  }

  applyDistractedFilter(input) {
    // Random information gets through
    return {
      ...input,
      content: input.content || '',
      importance: (input.importance || 0.3) * 0.5,
      filtered: Math.random() > 0.5
    };
  }

  applyStressedFilter(input) {
    // Stress amplifies negative, filters positive
    const isNegative = input.negative || false;
    return {
      ...input,
      content: input.content || '',
      importance: isNegative ? 1.5 : 0.5,
      filtered: isNegative ? false : Math.random() > 0.7
    };
  }

  applyRelaxedFilter(input) {
    // Relaxed state allows more through, less filtering
    return {
      ...input,
      content: input.content || '',
      importance: input.importance || 0.6,
      filtered: false
    };
  }

  calculateAttention(input, emotionalState) {
    let score = 0.5;
    
    // Base importance
    if (input.importance) score += input.importance * 0.2;
    
    // Emotional salience
    score += emotionalState.joy * 0.1;
    score += emotionalState.fear * 0.15;
    score += emotionalState.anger * 0.1;
    
    // Recency bias
    if (input.recency === 'immediate') score += 0.1;
    
    // Novelty
    if (input.novel) score += 0.1;
    
    return Math.min(1, Math.max(0, score));
  }

  extractSalient(input, attentionScore) {
    if (attentionScore > 0.7) {
      return {
        type: 'high',
        description: 'Requires immediate attention',
        priority: 'high'
      };
    } else if (attentionScore > 0.4) {
      return {
        type: 'medium',
        description: 'Worth processing',
        priority: 'medium'
      };
    } else {
      return {
        type: 'low',
        description: 'Background information',
        priority: 'low'
      };
    }
  }

  filterEmotional(input, emotionalState) {
    // Amplify or suppress emotional content
    const isEmotional = input.emotional || false;
    
    if (!isEmotional) return input;
    
    const intensity = emotionalState.joy + emotionalState.fear + 
                      emotionalState.sadness + emotionalState.anger;
    
    return {
      ...input,
      emotionalIntensity: intensity,
      amplified: intensity > 0.5
    };
  }

  // Set perception state
  setState(state) {
    const validStates = ['normal', 'focused', 'distracted', 'stressed', 'relaxed'];
    if (validStates.includes(state)) {
      this.state = state;
      return true;
    }
    return false;
  }

  // Get current weights
  getWeights() {
    return { ...this.weights };
  }

  // Get filter history
  getHistory(limit = 10) {
    return this.filterHistory.slice(-limit);
  }

  // Get status
  getStatus() {
    return {
      state: this.state,
      weights: this.weights,
      recentAttention: this.filterHistory.slice(-5).map(h => h.attentionScore)
    };
  }
}

module.exports = PerceptionFilter;

// Demo
if (require.main === module) {
  const filter = new PerceptionFilter();
  
  console.log('👁️ Perception Filter Demo\n');
  
  // Test different states
  const states = ['normal', 'focused', 'stressed', 'relaxed'];
  
  states.forEach(state => {
    filter.setState(state);
    const result = filter.process(
      { content: 'Important message', importance: 0.8, emotional: true },
      { joy: 0.7, fear: 0.1, sadness: 0.1, anger: 0.1 }
    );
    console.log(`${state}: attention=${result.attentionScore.toFixed(2)}, salient=${result.salient.type}`);
  });
  
  console.log('\n📊 Status:', filter.getStatus());
}
