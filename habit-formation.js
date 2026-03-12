/**
 * Genome Digital - Habit Formation Module
 * Converts repeated behaviors into habits
 * Added: 12 Mar 2026
 */

class HabitFormation {
  constructor() {
    this.habits = [];
    this.behaviorCounts = {};
    this.threshold = 5; // times before becoming habit
    this.habitStrength = {};
  }

  // Record behavior
  recordBehavior(behavior) {
    if (!this.behaviorCounts[behavior]) {
      this.behaviorCounts[behavior] = 0;
      this.habitStrength[behavior] = 0;
    }

    this.behaviorCounts[behavior]++;

    // Calculate habit strength based on repetition
    this.habitStrength[behavior] = Math.min(1, this.behaviorCounts[behavior] / 10);

    // Check if it becomes a habit
    if (this.behaviorCounts[behavior] >= this.threshold && 
        !this.isHabit(behavior)) {
      this.makeHabit(behavior);
    }

    return {
      behavior,
      count: this.behaviorCounts[behavior],
      strength: this.habitStrength[behavior],
      isHabit: this.isHabit(behavior)
    };
  }

  // Check if behavior is a habit
  isHabit(behavior) {
    return this.habits.some(h => h.behavior === behavior);
  }

  // Convert to habit
  makeHabit(behavior) {
    const habit = {
      id: Date.now(),
      behavior,
      strength: this.habitStrength[behavior],
      createdAt: Date.now(),
      automatic: true
    };

    this.habits.push(habit);
    return { habitFormed: true };
  }

  // Get habit by behavior
  getHabit(behavior) {
    return this.habits.find(h => h.behavior === behavior);
  }

  // Trigger habit (automatic execution)
  trigger(behavior) {
    if (this.isHabit(behavior)) {
      return {
        triggered: true,
        behavior,
        automatic: true,
        strength: this.habitStrength[behavior]
      };
    }

    return { triggered: false };
  }

  // Break a habit
  breakHabit(behavior) {
    const index = this.habits.findIndex(h => h.behavior === behavior);
    if (index !== -1) {
      this.habits.splice(index, 1);
      this.behaviorCounts[behavior] = 0;
      this.habitStrength[behavior] = 0;
    }

    return { habitBroken: true };
  }

  // Get all habits
  getHabits() {
    return this.habits;
  }

  // Get behavior statistics
  getStats() {
    return {
      totalHabits: this.habits.length,
      behaviorsTracked: Object.keys(this.behaviorCounts).length,
      strongestHabit: this.getStrongestHabit()
    };
  }

  // Get strongest habit
  getStrongestHabit() {
    if (this.habits.length === 0) return null;

    return this.habits.reduce((max, h) => 
      h.strength > max.strength ? h : max
    );
  }

  getStatus() {
    return this.getStats();
  }
}

module.exports = HabitFormation;
