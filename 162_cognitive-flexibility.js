/**
 * Genome Digital - Cognitive Flexibility
 * Adapting to new situations and shifting mental sets
 * Added: 11 Mar 2026
 */

class CognitiveFlexibility {
  constructor() {
    this.mindset = 'fixed';
    this.shifts = 0;
    this.adaptations = [];
    this.flexibility = 0.5;
  }

  shiftApproach(newApproach) {
    const shift = {
      from: this.mindset,
      to: newApproach,
      timestamp: Date.now()
    };
    
    this.mindset = newApproach;
    this.shifts++;
    this.flexibility = Math.min(1, this.shifts / 20);
    
    this.adaptations.push(shift);
    return shift;
  }

  adapt(situation) {
    const adaptation = {
      situation,
      approach: this.mindset,
      adapted: true,
      timestamp: Date.now()
    };
    
    this.adaptations.push(adaptation);
    return adaptation;
  }

  switch(task) {
    const tasks = ['analyze', 'create', 'evaluate', 'implement'];
    const current = tasks.indexOf(task);
    
    return {
      from: tasks[(current - 1 + tasks.length) % tasks.length],
      to: task,
      switched: true
    };
  }

  getFlexibilityScore() {
    return {
      flexibility: this.flexibility,
      totalShifts: this.shifts,
      recentAdaptations: this.adaptations.slice(-10).length
    };
  }
}

module.exports = CognitiveFlexibility;
