/**
 * Genome Digital - Willpower Module
 * Self-control, discipline, and impulse management
 * Added: 11 Mar 2026
 */

class WillpowerModule {
  constructor() {
    this.willpower = 100;
    this.maxWillpower = 100;
    this.impulsesResisted = [];
    this.temptationsFaced = 0;
    this.temptationsYielded = 0;
  }

  faceTemptation(temptation, resistanceLevel = 0.7) {
    this.temptationsFaced++;
    
    const resisted = Math.random() < resistanceLevel;
    
    if (resisted) {
      this.impulsesResisted.push({
        temptation,
        resisted: true,
        willpowerCost: Math.floor(Math.random() * 10) + 5,
        timestamp: Date.now()
      });
      this.willpower = Math.max(0, this.willpower - (Math.random() * 10 + 5));
    } else {
      this.temptationsYielded++;
    }
    
    return { temptation, resisted, willpowerRemaining: this.willpower };
  }

  resistImpulse(impulse) {
    const cost = Math.floor(Math.random() * 15) + 10;
    this.willpower = Math.max(0, this.willpower - cost);
    
    this.impulsesResisted.push({
      impulse,
      resisted: true,
      willpowerCost: cost,
      timestamp: Date.now()
    });
    
    return { resisted: true, cost, willpowerRemaining: this.willpower };
  }

  restoreWillpower(amount) {
    this.willpower = Math.min(this.maxWillpower, this.willpower + amount);
    return { restored: amount, currentWillpower: this.willpower };
  }

  makeDecision(decision, requiresWillpower = false) {
    if (requiresWillpower && this.willpower < 20) {
      return {
        decision,
        made: false,
        reason: 'Low willpower - decision delayed'
      };
    }
    
    if (requiresWillpower) {
      this.willpower -= 10;
    }
    
    return {
      decision,
      made: true,
      willpowerSpent: requiresWillpower ? 10 : 0,
      willpowerRemaining: this.willpower
    };
  }

  getStats() {
    return {
      willpower: this.willpower,
      maxWillpower: this.maxWillpower,
      impulsesResisted: this.impulsesResisted.length,
      temptationsFaced: this.temptationsFaced,
      temptationsYielded: this.temptationsYielded,
      resistanceRate: this.temptationsFaced > 0 
        ? ((this.temptationsFaced - this.temptationsYielded) / this.temptationsFaced * 100).toFixed(1) + '%'
        : 'N/A'
    };
  }

  restAndRecover() {
    this.willpower = this.maxWillpower;
    return { recovered: true, willpower: this.willpower };
  }
}

module.exports = WillpowerModule;
