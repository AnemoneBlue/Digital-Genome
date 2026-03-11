/**
 * Genome Digital - Context Awareness
 * Understand current situation
 * Added: 11 Mar 2026
 */

class ContextAwareness {
  constructor() {
    this.context = {};
    this.history = [];
  }

  updateContext(key, value) {
    this.context[key] = value;
    return this.context;
  }

  getContext() {
    return this.context;
  }

  understandSituation() {
    return {
      time: new Date().toISOString(),
      state: this.context,
      awareness: Math.random() * 0.3 + 0.7
    };
  }

  maintainHistory(entry) {
    this.history.push({ entry, timestamp: Date.now() });
    return this.history.length;
  }

  recallContext(timeAgo = 60) {
    const cutoff = Date.now() - timeAgo * 60 * 1000;
    return this.history.filter(h => h.timestamp > cutoff);
  }
}

module.exports = ContextAwareness;
