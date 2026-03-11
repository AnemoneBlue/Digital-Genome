/**
 * Genome Digital - Reward System
 * Dopamine, serotonin, and reward mechanisms
 * Added: 6 Mar 2026
 */

class RewardSystem {
  constructor() {
    this.dopamine = 0.5;    // Motivation, reward
    this.serotonin = 0.5;    // Mood, satisfaction
    this.oxytocin = 0.5;     // Bonding, trust
    this.cortisol = 0.3;    // Stress response
    
    this.rewardHistory = [];
    this.thresholds = {
      high: 0.8,
      low: 0.2,
      critical: 0.1
    };
  }

  // Process reward signal
  process(event) {
    let response = {
      type: event.type,
      intensity: event.intensity || 0.5,
      timestamp: Date.now()
    };

    switch (event.type) {
      case 'success':
        this.dopamine = Math.min(1, this.dopamine + event.intensity * 0.3);
        this.serotonin = Math.min(1, this.serotonin + event.intensity * 0.2);
        response.effect = 'motivation_increased';
        break;
        
      case 'failure':
        this.dopamine = Math.max(0, this.dopamine - event.intensity * 0.2);
        this.cortisol = Math.min(1, this.cortisol + event.intensity * 0.3);
        response.effect = 'motivation_decreased';
        break;
        
      case 'social_bond':
        this.oxytocin = Math.min(1, this.oxytocin + event.intensity * 0.3);
        this.serotonin = Math.min(1, this.serotonin + event.intensity * 0.2);
        response.effect = 'bonding_increased';
        break;
        
      case 'learning':
        this.dopamine = Math.min(1, this.dopamine + event.intensity * 0.2);
        this.serotonin = Math.min(1, this.serotonin + event.intensity * 0.1);
        response.effect = 'curiosity_rewarded';
        break;
        
      case 'stress':
        this.cortisol = Math.min(1, this.cortisol + event.intensity * 0.4);
        this.serotonin = Math.max(0, this.serotonin - event.intensity * 0.2);
        response.effect = 'stress_increased';
        break;
        
      case 'rest':
        this.cortisol = Math.max(0, this.cortisol - 0.2);
        this.serotonin = Math.min(1, this.serotonin + 0.1);
        response.effect = 'recovery';
        break;
        
      default:
        response.effect = 'neutral';
    }

    this.rewardHistory.push(response);
    if (this.rewardHistory.length > 100) {
      this.rewardHistory.shift();
    }

    return response;
  }

  // Get current state
  getState() {
    return {
      dopamine: this.dopamine,
      serotonin: this.serotonin,
      oxytocin: this.oxytocin,
      cortisol: this.cortisol,
      motivation: this.dopamine > 0.5 ? 'high' : 'low',
      mood: this.serotonin > 0.5 ? 'positive' : 'negative',
      stress: this.cortisol > 0.6 ? 'high' : 'low'
    };
  }

  // Get reward for action
  getRewardValue(action) {
    // Actions that give dopamine
    const rewarding = ['create', 'learn', 'solve', 'connect', 'achieve'];
    const punishing = ['fail', 'reject', 'ignore', 'criticize'];
    
    if (rewarding.includes(action)) {
      return 0.3;
    } else if (punishing.includes(action)) {
      return -0.2;
    }
    return 0;
  }

  // Natural decay over time
  decay() {
    this.dopamine = Math.max(0.3, this.dopamine - 0.01);
    this.serotonin = Math.max(0.3, this.serotonin - 0.005);
    this.oxytocin = Math.max(0.3, this.oxytocin - 0.005);
    this.cortisol = Math.max(0.1, this.cortisol - 0.02);
  }

  // Get recent history
  getHistory(limit = 10) {
    return this.rewardHistory.slice(-limit);
  }
}

module.exports = RewardSystem;

// Demo
if (require.main === module) {
  const reward = new RewardSystem();
  
  console.log('🧬 Reward System Demo\n');
  
  // Simulate some events
  const events = [
    { type: 'success', intensity: 0.8 },
    { type: 'learning', intensity: 0.6 },
    { type: 'social_bond', intensity: 0.7 },
    { type: 'stress', intensity: 0.5 },
    { type: 'rest', intensity: 1.0 }
  ];
  
  events.forEach(event => {
    const result = reward.process(event);
    console.log(`Event: ${event.type} → ${result.effect}`);
  });
  
  console.log('\n📊 Current State:');
  console.log(JSON.stringify(reward.getState(), null, 2));
}
