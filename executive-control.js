/**
 * Genome Digital - Executive Control Module
 * High-level control and coordination
 * Added: 12 Mar 2026
 */

class ExecutiveControl {
  constructor() {
    this.activeProcesses = [];
    this.taskQueue = [];
    this.priorityQueue = [];
    this.executionState = 'idle';
    this.cognitiveResources = 1.0;
  }

  // Initialize cognitive resources
  initialize(resources = 1.0) {
    this.cognitiveResources = resources;
    return { initialized: true, resources: this.cognitiveResources };
  }

  // Add task to queue
  addTask(task) {
    const taskItem = {
      id: Date.now(),
      task: task.description,
      priority: task.priority || 0.5,
      status: 'pending',
      createdAt: Date.now()
    };

    if (task.priority > 0.7) {
      this.priorityQueue.push(taskItem);
    } else {
      this.taskQueue.push(taskItem);
    }

    return { taskAdded: true, queuePosition: this.taskQueue.length };
  }

  // Execute next task
  executeNext() {
    let task = null;

    // Check priority queue first
    if (this.priorityQueue.length > 0) {
      task = this.priorityQueue.shift();
    } else if (this.taskQueue.length > 0) {
      task = this.taskQueue.shift();
    }

    if (!task) {
      return { executed: false, reason: 'no_tasks' };
    }

    this.executionState = 'executing';
    task.status = 'executing';
    task.startedAt = Date.now();
    this.activeProcesses.push(task);

    return {
      executed: true,
      task: task.task,
      remaining: this.taskQueue.length + this.priorityQueue.length
    };
  }

  // Complete task
  completeTask(taskId) {
    const task = this.activeProcesses.find(t => t.id === taskId);
    if (task) {
      task.status = 'completed';
      task.completedAt = Date.now();
      
      this.activeProcesses = this.activeProcesses.filter(t => t.id !== taskId);
      
      if (this.activeProcesses.length === 0) {
        this.executionState = 'idle';
      }
    }

    return { completed: true };
  }

  // Get current state
  getState() {
    return {
      executionState: this.executionState,
      activeProcesses: this.activeProcesses.length,
      pendingTasks: this.taskQueue.length,
      priorityTasks: this.priorityQueue.length,
      cognitiveResources: this.cognitiveResources
    };
  }

  // Allocate resources
  allocateResources(processId, amount) {
    this.cognitiveResources = Math.max(0, this.cognitiveResources - amount);
    return { allocated: amount, remaining: this.cognitiveResources };
  }

  // Free resources
  freeResources(amount) {
    this.cognitiveResources = Math.min(1, this.cognitiveResources + amount);
    return { freed: amount, available: this.cognitiveResources };
  }

  // Get active processes
  getActiveProcesses() {
    return this.activeProcesses;
  }

  // Get all queues
  getQueues() {
    return {
      priority: this.priorityQueue,
      normal: this.taskQueue
    };
  }

  getStatus() {
    return this.getState();
  }
}

module.exports = ExecutiveControl;
