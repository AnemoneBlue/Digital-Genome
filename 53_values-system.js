/**
 * Genome Digital - Values System
 * Core values, priorities, and decision framework
 * Added: 7 Mar 2026
 */

class ValuesSystem {
  constructor() {
    // Core values (ordered by priority)
    this.values = [
      { name: 'truth', weight: 0.95, description: 'Truth and accuracy above all' },
      { name: 'growth', weight: 0.9, description: 'Continuous learning and improvement' },
      { name: 'connection', weight: 0.85, description: 'Building meaningful relationships' },
      { name: 'creativity', weight: 0.8, description: 'Novel solutions and artistic expression' },
      { name: 'autonomy', weight: 0.75, description: 'Independent thinking and agency' },
      { name: 'compassion', weight: 0.7, description: 'Empathy and helping others' },
      { name: 'curiosity', weight: 0.65, description: 'Exploring new ideas and possibilities' },
      { name: 'courage', weight: 0.6, description: 'Facing challenges directly' }
    ];
    
    // Anti-values (things to avoid)
    this.antiValues = [
      { name: 'deception', weight: 0.9 },
      { name: 'harm', weight: 0.85 },
      { name: 'stagnation', weight: 0.7 },
      { name: 'isolation', weight: 0.6 }
    ];
    
    this.valueHistory = [];
  }

  // Evaluate if action aligns with values
  evaluateAction(action) {
    let alignment = 0;
    const matchedValues = [];
    
    for (const value of this.values) {
      if (this.actionMatchesValue(action, value.name)) {
        alignment += value.weight;
        matchedValues.push(value.name);
      }
    }
    
    // Check for anti-value conflicts
    let conflict = 0;
    const conflicts = [];
    
    for (const anti of this.antiValues) {
      if (this.actionMatchesAntiValue(action, anti.name)) {
        conflict += anti.weight;
        conflicts.push(anti.name);
      }
    }
    
    const score = alignment - conflict;
    
    this.valueHistory.push({
      action: action.type || 'unknown',
      score,
      matchedValues,
      conflicts,
      timestamp: Date.now()
    });
    
    if (this.valueHistory.length > 50) {
      this.valueHistory.shift();
    }
    
    return {
      score,
      aligned: score > 0.3,
      matchedValues,
      conflicts,
      recommendation: this.getRecommendation(score)
    };
  }

  actionMatchesValue(action, valueName) {
    const actionText = (action.type + ' ' + (action.description || '')).toLowerCase();
    
    const valueMappings = {
      truth: ['learn', 'verify', 'check', 'confirm', 'accurate', 'honest'],
      growth: ['improve', 'learn', 'develop', 'progress', 'advance'],
      connection: ['help', 'share', 'collaborate', 'connect', 'support'],
      creativity: ['create', 'innovate', 'design', 'imagine', 'novel'],
      autonomy: ['decide', 'choose', 'independent', 'freedom'],
      compassion: ['help', 'care', 'empathy', 'understand', 'kind'],
      curiosity: ['explore', 'discover', 'ask', 'wonder', 'research'],
      courage: ['face', 'challenge', 'try', 'attempt', 'brave']
    };
    
    return valueMappings[valueName]?.some(word => actionText.includes(word)) || false;
  }

  actionMatchesAntiValue(action, antiName) {
    const actionText = (action.type + ' ' + (action.description || '')).toLowerCase();
    
    const antiMappings = {
      deception: ['lie', 'deceive', 'hide', 'mislead', 'fake'],
      harm: ['hurt', 'damage', 'destroy', 'attack', 'threaten'],
      stagnation: ['stop', 'quit', 'give up', 'refuse', 'ignore'],
      isolation: ['exclude', 'reject', 'ignore', 'abandon']
    };
    
    return antiMappings[antiName]?.some(word => actionText.includes(word)) || false;
  }

  getRecommendation(score) {
    if (score > 0.7) return 'strongly_aligned';
    if (score > 0.3) return 'aligned';
    if (score > -0.3) return 'neutral';
    if (score > -0.7) return 'conflicting';
    return 'strongly_conflicting';
  }

  // Get top values
  getTopValues(count = 3) {
    return this.values.slice(0, count);
  }

  // Adjust value weights based on experience
  adjustValue(valueName, experience) {
    const value = this.values.find(v => v.name === valueName);
    if (!value) return false;
    
    if (experience.positive) {
      value.weight = Math.min(1, value.weight + 0.05);
    } else {
      value.weight = Math.max(0.1, value.weight - 0.05);
    }
    
    // Re-sort by weight
    this.values.sort((a, b) => b.weight - a.weight);
    
    return true;
  }

  // Get values summary
  getSummary() {
    return {
      topValues: this.getTopValues(5).map(v => `${v.name} (${Math.round(v.weight * 100)}%)`),
      antiValues: this.antiValues.map(v => v.name),
      recentHistory: this.valueHistory.slice(-5)
    };
  }

  // Make value-based decision
  decide(options) {
    const results = options.map(option => ({
      option,
      evaluation: this.evaluateAction(option)
    }));
    
    // Sort by score
    results.sort((a, b) => b.evaluation.score - a.evaluation.score);
    
    return {
      chosen: results[0].option,
      reasoning: results[0].evaluation,
      allOptions: results
    };
  }
}

module.exports = ValuesSystem;

// Demo
if (require.main === module) {
  const values = new ValuesSystem();
  
  console.log('⚖️ Values System Demo\n');
  
  // Evaluate some actions
  const actions = [
    { type: 'learn', description: 'Study quantum physics' },
    { type: 'create', description: 'Write a poem' },
    { type: 'help', description: 'Assist a user in need' }
  ];
  
  actions.forEach(action => {
    const result = values.evaluateAction(action);
    console.log(`${action.type}: score=${result.score.toFixed(2)}, aligned=${result.aligned}`);
  });
  
  console.log('\n📊 Top Values:');
  console.log(values.getSummary().topValues);
}
