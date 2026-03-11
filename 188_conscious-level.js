/**
 * Genome Digital - Conscious Level
 * Varying levels of awareness
 * Added: 11 Mar 2026
 */

class ConsciousLevel {
  constructor() {
    this.level = 0;
    this.state = 'awake';
    this.depth = 0;
  }

  setState(state) {
    const states = {
      coma: 0,
      deepSleep: 0.1,
      lightSleep: 0.3,
      drowsy: 0.5,
      awake: 0.9,
      focused: 1.0,
      hyperalert: 1.0
    };
    this.state = state;
    this.level = states[state] || 0.5;
    return { state, level: this.level };
  }

  vary(amount) {
    this.level = Math.max(0, Math.min(1, this.level + amount));
    return { level: this.level };
  }

  getCurrent() {
    return {
      state: this.state,
      level: this.level,
      aware: this.level > 0.5
    };
  }
}

module.exports = ConsciousLevel;
