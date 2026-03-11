/**
 * Genome Digital - Habit Formation
 * Automatic behavior patterns
 * Added: 11 Mar 2026
 */

class HabitFormation {
  constructor() {
    this.habits = [];
    this.streaks = new Map();
  }

  createHabit(action, trigger, reward) {
    const habit = {
      id: Date.now(),
      action,
      trigger,
      reward,
      repetitions: 0,
      automatic: false,
      created: Date.now()
    };
    this.habits.push(habit);
    return habit;
  }

  performHabit(trigger) {
    const habit = this.habits.find(h => h.trigger === trigger);
    if (habit) {
      habit.repetitions++;
      this.streaks.set(habit.id, (this.streaks.get(habit.id) || 0) + 1);
      
      if (habit.repetitions > 21) {
        habit.automatic = true;
      }
    }
    return habit;
  }

  breakHabit(habitId) {
    const habit = this.habits.find(h => h.id === habitId);
    if (habit) {
      habit.automatic = false;
      this.streaks.set(habitId, 0);
    }
    return { broken: true };
  }

  getHabits() {
    return this.habits;
  }
}

module.exports = HabitFormation;
