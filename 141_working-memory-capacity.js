/**
 * Genome Digital - Working Memory Capacity
 * The magical number 7 ± 2 - cognitive load limits
 * Added: 11 Mar 2026
 */

class WorkingMemoryCapacity {
  constructor() {
    this.capacity = 7;
    this.chunks = [];
    this.load = 0;
    this.attentionFocus = null;
  }

  hold(item, chunks = 1) {
    if (this.load + chunks <= this.capacity) {
      this.chunks.push({ item, chunks, timestamp: Date.now() });
      this.load += chunks;
      return { held: true, load: this.load, capacity: this.capacity };
    }
    return { held: false, reason: 'capacity_exceeded', load: this.load };
  }

  manipulate(operation) {
    if (this.chunks.length === 0) return { error: 'empty' };
    
    const result = {
      operation,
      before: this.chunks.length,
      after: Math.max(0, this.chunks.length - 1),
      processed: true
    };
    
    if (operation === 'process') {
      this.load = Math.max(0, this.load - 1);
    }
    
    return result;
  }

  clear() {
    const cleared = this.chunks.length;
    this.chunks = [];
    this.load = 0;
    return { cleared, capacity: this.capacity };
  }

  focus(item) {
    this.attentionFocus = item;
    return { focused: item, allItems: this.chunks.map(c => c.item) };
  }

  getLoad() {
    return {
      current: this.load,
      capacity: this.capacity,
      percentage: (this.load / this.capacity) * 100,
      items: this.chunks.length
    };
  }
}

module.exports = WorkingMemoryCapacity;
