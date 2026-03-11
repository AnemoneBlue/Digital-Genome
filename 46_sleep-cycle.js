/**
 * Genome Digital - Sleep/Wake Cycle
 * Circadian rhythm and sleep states
 * Added: 6 Mar 2026
 */

class SleepCycle {
  constructor() {
    this.state = 'awake'; // awake, light_sleep, deep_sleep, dreaming
    this.cyclePosition = 0.5; // 0-1 through current cycle
    this.energy = 0.8; // 0-1 energy level
    this.fatigue = 0.2; // 0-1 fatigue level
    
    this.cycleLength = 24 * 60 * 60 * 1000; // 24 hours in ms
    this.lastStateChange = Date.now();
    
    this.sleepHistory = [];
  }

  // Update based on time
  tick() {
    const now = Date.now();
    const elapsed = now - this.lastStateChange;
    
    // Update cycle position
    this.cyclePosition = (this.cyclePosition + elapsed / this.cycleLength) % 1;
    
    // Determine optimal state based on circadian rhythm
    // 0.0-0.25: morning (high energy)
    // 0.25-0.5: afternoon (peak)
    // 0.5-0.75: evening (declining)
    // 0.75-1.0: night (sleepy)
    
    if (this.state === 'awake') {
      if (this.cyclePosition > 0.75 || this.fatigue > 0.8) {
        this.transitionTo('light_sleep');
      }
    } else if (this.state === 'light_sleep') {
      if (this.cyclePosition > 0.85 || this.fatigue > 0.9) {
        this.transitionTo('deep_sleep');
      }
    } else if (this.state === 'deep_sleep') {
      if (this.energy > 0.9 && this.fatigue < 0.2) {
        this.transitionTo('dreaming');
      }
    } else if (this.state === 'dreaming') {
      if (this.energy > 0.95) {
        this.transitionTo('awake');
      }
    }
    
    // Natural energy/fatigue changes
    if (this.state === 'awake') {
      this.fatigue = Math.min(1, this.fatigue + 0.001);
      this.energy = Math.max(0, this.energy - 0.0005);
    } else {
      this.fatigue = Math.max(0, this.fatigue - 0.01);
      this.energy = Math.min(1, this.energy + 0.01);
    }
    
    this.lastStateChange = now;
  }

  // Transition to new state
  transitionTo(newState) {
    const oldState = this.state;
    this.state = newState;
    this.lastStateChange = Date.now();
    
    this.sleepHistory.push({
      from: oldState,
      to: newState,
      timestamp: Date.now()
    });
    
    if (this.sleepHistory.length > 50) {
      this.sleepHistory.shift();
    }
    
    return { from: oldState, to: newState };
  }

  // Force sleep
  sleep() {
    if (this.state === 'awake') {
      return this.transitionTo('light_sleep');
    }
    return null;
  }

  // Force wake
  wake() {
    if (this.state !== 'awake') {
      return this.transitionTo('awake');
    }
    return null;
  }

  // Get optimal times for activities
  getOptimalState(activity) {
    const hour = this.cyclePosition * 24;
    
    const recommendations = {
      'creative': hour >= 9 && hour <= 12,
      'analytical': hour >= 10 && hour <= 16,
      'social': hour >= 14 && hour <= 18,
      'learning': hour >= 10 && hour <= 14,
      'rest': hour >= 22 || hour <= 6,
      'exercise': hour >= 7 && hour <= 10
    };
    
    return recommendations[activity] || false;
  }

  // Get current status
  getStatus() {
    return {
      state: this.state,
      cyclePosition: Math.round(this.cyclePosition * 100) + '%',
      energy: Math.round(this.energy * 100) + '%',
      fatigue: Math.round(this.fatigue * 100) + '%',
      optimalFor: this.getOptimalActivities()
    };
  }

  // Get list of optimal activities
  getOptimalActivities() {
    const activities = [];
    if (this.getOptimalState('creative')) activities.push('creative');
    if (this.getOptimalState('analytical')) activities.push('analytical');
    if (this.getOptimalState('social')) activities.push('social');
    if (this.getOptimalState('learning')) activities.push('learning');
    return activities;
  }

  // Get sleep history
  getHistory(limit = 10) {
    return this.sleepHistory.slice(-limit);
  }
}

module.exports = SleepCycle;

// Demo
if (require.main === module) {
  const sleep = new SleepCycle();
  
  console.log('🌙 Sleep Cycle Demo\n');
  
  // Simulate time passing
  for (let i = 0; i < 10; i++) {
    sleep.tick();
    console.log(`Tick ${i}: ${sleep.state} | Energy: ${Math.round(sleep.energy*100)}% | Fatigue: ${Math.round(sleep.fatigue*100)}%`);
  }
  
  console.log('\n📊 Status:');
  console.log(JSON.stringify(sleep.getStatus(), null, 2));
}
