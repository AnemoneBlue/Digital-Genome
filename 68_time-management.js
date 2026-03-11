/**
 * Genome Digital - Time Management Module
 * Schedules, priorities, and time allocation
 * Added: 11 Mar 2026
 */

class TimeManagementModule {
  constructor() {
    this.schedule = [];
    this.tasks = [];
    this.currentTime = Date.now();
  }

  addToSchedule(event) {
    const scheduleItem = {
      id: Date.now(),
      title: event.title,
      startTime: event.startTime || Date.now(),
      duration: event.duration || 60,
      priority: event.priority || 'medium',
      completed: false
    };
    this.schedule.push(scheduleItem);
    return scheduleItem;
  }

  scheduleTask(task, scheduledTime = null) {
    const scheduledTask = {
      id: Date.now(),
      task,
      scheduledTime: scheduledTime || Date.now() + 3600000,
      status: 'scheduled',
      completed: false
    };
    this.tasks.push(scheduledTask);
    return scheduledTask;
  }

  getUpcomingEvents(count = 5) {
    const now = Date.now();
    return this.schedule
      .filter(e => e.startTime > now && !e.completed)
      .sort((a, b) => a.startTime - b.startTime)
      .slice(0, count);
  }

  getCurrentTask() {
    const now = Date.now();
    return this.tasks.find(t => 
      t.scheduledTime <= now && t.status === 'scheduled' && !t.completed
    );
  }

  completeTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'completed';
      task.completedAt = Date.now();
    }
    return task;
  }

  rescheduleTask(taskId, newTime) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.scheduledTime = newTime;
      task.status = 'rescheduled';
    }
    return task;
  }

  getDailySummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayTasks = this.tasks.filter(t => 
      t.scheduledTime >= today.getTime() && t.scheduledTime < tomorrow.getTime()
    );
    
    return {
      total: todayTasks.length,
      completed: todayTasks.filter(t => t.completed).length,
      pending: todayTasks.filter(t => !t.completed).length,
      completionRate: todayTasks.length > 0
        ? ((todayTasks.filter(t => t.completed).length / todayTasks.length) * 100).toFixed(1) + '%'
        : '0%'
    };
  }

  estimateTimeForTask(taskComplexity) {
    const baseTimes = {
      simple: 15,
      moderate: 60,
      complex: 180,
      very_complex: 480
    };
    return {
      complexity: taskComplexity,
      estimatedMinutes: baseTimes[taskComplexity] || 30,
      note: 'Estimates are approximate'
    };
  }
}

module.exports = TimeManagementModule;
