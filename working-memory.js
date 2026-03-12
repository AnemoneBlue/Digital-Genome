/**
 * Genome Digital - Working Memory Module
 * Maintains information for immediate processing
 * Added: 12 Mar 2026
 */

class WorkingMemory {
  constructor() {
    this.capacity = 7; // Miller's number
    this.items = [];
    this.buffers = {
      phonological: [],
      visuospatial: [],
      episodic: []
    };
  }

  // Add item to working memory
  add(item) {
    if (this.items.length >= this.capacity) {
      // Remove oldest item
      this.items.shift();
    }

    this.items.push({
      id: Date.now(),
      content: item,
      timestamp: Date.now()
    });

    return { added: true, count: this.items.length };
  }

  // Add to specific buffer
  addToBuffer(buffer, item) {
    if (this.buffers[buffer]) {
      this.buffers[buffer].push({
        id: Date.now(),
        content: item
      });
    }
    return { added: true, buffer };
  }

  // Retrieve item
  retrieve(itemId) {
    return this.items.find(i => i.id === itemId);
  }

  // Get recent items
  getRecent(count = 3) {
    return this.items.slice(-count);
  }

  // Maintain item (refresh)
  maintain(itemId) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.timestamp = Date.now();
    }
    return { maintained: true };
  }

  // Clear working memory
  clear() {
    const count = this.items.length;
    this.items = [];
    Object.keys(this.buffers).forEach(b => this.buffers[b] = []);
    return { cleared: true, count };
  }

  // Chunk information
  chunk(information) {
    const chunkSize = Math.ceil(information.length / this.capacity);
    const chunks = [];

    for (let i = 0; i < information.length; i += chunkSize) {
      chunks.push(information.slice(i, i + chunkSize));
    }

    return chunks;
  }

  // Get status
  getStatus() {
    return {
      items: this.items.length,
      capacity: this.capacity,
      utilization: this.items.length / this.capacity,
      buffers: Object.keys(this.buffers).map(b => ({
        name: b,
        count: this.buffers[b].length
      }))
    };
  }
}

module.exports = WorkingMemory;
