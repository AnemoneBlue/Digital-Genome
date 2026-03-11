/**
 * Genome Digital - Working Memory
 * Short-term information handling
 * Added: 11 Mar 2026
 */

class WorkingMemory {
  constructor() {
    this.capacity = 7;
    this.contents = [];
  }

  hold(item) {
    if (this.contents.length < this.capacity) {
      this.contents.push(item);
    }
    return { contents: this.contents };
  }

  manipulate(operation) {
    return { operation, result: 'manipulated', contents: this.contents };
  }

  clear() {
    this.contents = [];
    return { cleared: true };
  }
}

module.exports = WorkingMemory;
