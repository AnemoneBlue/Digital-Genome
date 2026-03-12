/**
 * Genome Digital - Goal Planning Module
 * Creates and manages goal-oriented behavior
 * Added: 12 Mar 2026
 */

class GoalPlanning {
  constructor() {
    this.goals = [];
    this.activePlan = null;
    this.planHistory = [];
    this.goalHierarchy = {};
  }

  // Create a new goal
  createGoal(description, priority = 0.5, deadline = null) {
    const goal = {
      id: Date.now(),
      description,
      priority,
      deadline,
      status: 'active',
      subgoals: [],
      steps: [],
      createdAt: Date.now(),
      progress: 0
    };

    this.goals.push(goal);
    return { goalCreated: true, goal };
  }

  // Add subgoals to a goal
  addSubgoal(goalId, subgoals) {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) {
      return { error: 'Goal not found' };
    }

    subgoals.forEach((subgoal, index) => {
      goal.subgoals.push({
        id: `${goalId}_${index}`,
        description: subgoal,
        completed: false,
        order: index
      });
    });

    return { subgoalsAdded: true, subgoals: goal.subgoals.length };
  }

  // Create action plan for goal
  createPlan(goalId) {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) {
      return { error: 'Goal not found' };
    }

    // Convert subgoals to actionable steps
    const steps = goal.subgoals.map((subgoal, index) => ({
      stepId: index,
      description: `Complete: ${subgoal.description}`,
      status: 'pending',
      estimatedTime: Math.random() * 10 + 5
    }));

    // If no subgoals, create generic steps
    if (steps.length === 0) {
      steps.push(
        { stepId: 0, description: 'Analyze goal', status: 'pending', estimatedTime: 5 },
        { stepId: 1, description: 'Gather resources', status: 'pending', estimatedTime: 10 },
        { stepId: 2, description: 'Execute primary action', status: 'pending', estimatedTime: 15 },
        { stepId: 3, description: 'Verify completion', status: 'pending', estimatedTime: 5 }
      );
    }

    this.activePlan = {
      goalId,
      steps,
      currentStep: 0,
      startedAt: Date.now(),
      status: 'active'
    };

    goal.status = 'planning';

    return { planCreated: true, steps: steps.length };
  }

  // Execute next step in plan
  executeStep() {
    if (!this.activePlan) {
      return { error: 'No active plan' };
    }

    const currentStepIndex = this.activePlan.currentStep;
    const step = this.activePlan.steps[currentStepIndex];

    step.status = 'completed';
    step.completedAt = Date.now();

    // Move to next step
    this.activePlan.currentStep++;

    // Check if plan is complete
    const allComplete = this.activePlan.steps.every(s => s.status === 'completed');
    
    if (allComplete) {
      this.activePlan.status = 'completed';
      this.activePlan.completedAt = Date.now();
      
      // Mark goal as achieved
      const goal = this.goals.find(g => g.id === this.activePlan.goalId);
      if (goal) {
        goal.status = 'achieved';
        goal.progress = 100;
        goal.completedAt = Date.now();
      }

      this.planHistory.push({ ...this.activePlan });
      this.activePlan = null;

      return { planCompleted: true };
    }

    return {
      stepCompleted: true,
      nextStep: this.activePlan.steps[this.activePlan.currentStep],
      progress: (currentStepIndex / this.activePlan.steps.length) * 100
    };
  }

  // Get current goal
  getCurrentGoal() {
    return this.goals.find(g => g.status === 'active' || g.status === 'planning');
  }

  // Get all goals
  getGoals() {
    return this.goals;
  }

  // Update goal priority
  updatePriority(goalId, newPriority) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.priority = newPriority;
      // Re-sort goals by priority
      this.goals.sort((a, b) => b.priority - a.priority);
    }
    return { updated: true };
  }

  // Get plan status
  getStatus() {
    return {
      totalGoals: this.goals.length,
      activeGoals: this.goals.filter(g => g.status === 'active').length,
      achievedGoals: this.goals.filter(g => g.status === 'achieved').length,
      hasActivePlan: this.activePlan !== null,
      plansCompleted: this.planHistory.length
    };
  }
}

module.exports = GoalPlanning;
