/**
 * Genome Digital - Global Workspace
 * Consciousness as information sharing - Bernard Baars' theory
 * Added: 11 Mar 2026
 */

class GlobalWorkspace {
  constructor() {
    this.broadcasts = [];
    this.conscious = false;
    this.workspace = null;
    this.subscribers = [];
  }

  broadcast(content, priority = 'normal') {
    const broadcast = {
      content,
      priority,
      timestamp: Date.now(),
      broadcasted: true
    };
    
    this.broadcasts.push(broadcast);
    this.workspace = content;
    
    const responses = this.distributeToSubscribers(content);
    
    return {
      ...broadcast,
      distributed: responses.length,
      responses
    };
  }

  becomeConscious() {
    this.conscious = true;
    return {
      conscious: true,
      workspace: this.workspace,
      timestamp: Date.now()
    };
  }

  distributeToSubscribers(content) {
    return this.subscribers.map(sub => ({
      subscriber: sub,
      received: content,
      processed: true
    }));
  }

  subscribe(processor) {
    this.subscribers.push(processor);
    return { subscriber: processor, total: this.subscribers.length };
  }

  getConsciousContent() {
    return {
      workspace: this.workspace,
      conscious: this.conscious,
      broadcastCount: this.broadcasts.length
    };
  }
}

module.exports = GlobalWorkspace;
