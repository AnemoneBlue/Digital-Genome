/**
 * Genome Digital - Goals Module
 * Manages goals, planning, and achievement tracking
 * Added: 11 Mar 2026
 */

class GoalsModule {
  constructor() {
    this.goals = [];
    this.completedGoals = [];
    this.activeGoal = null;
  }

  createGoal(title, description = '', priority = 'medium', deadline = null) {
    const goal = {
      id: Date.now(),
      title,
      description,
      priority,
      deadline,
      status: 'active',
      progress: 0,
      createdAt: Date.now()
    };
    this.goals.push(goal);
    return goal;
  }

  setActiveGoal(goalId) {
    this.activeGoal = this.goals.find(g => g.id === goalId);
    return this.activeGoal;
  }

  updateProgress(goalId, progress) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.progress = Math.min(100, Math.max(0, progress));
      if (goal.progress >= 100) {
        goal.status = 'completed';
        this.completedGoals.push(goal);
      }
    }
    return goal;
  }

  getGoalsByPriority(priority) {
    return this.goals.filter(g => g.priority === priority && g.status === 'active');
  }

  getActiveGoals() {
    return this.goals.filter(g => g.status === 'active');
  }

  archiveGoal(goalId) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.status = 'archived';
    }
    return goal;
  }

  getGoalSummary() {
    return {
      total: this.goals.length,
      active: this.goals.filter(g => g.status === 'active').length,
      completed: this.completedGoals.length,
      byPriority: {
        high: this.goals.filter(g => g.priority === 'high').length,
        medium: this.goals.filter(g => g.priority === 'medium').length,
        low: this.goals.filter(g => g.priority === 'low').length
      }
    };
  }
}

module.exports = GoalsModule;
