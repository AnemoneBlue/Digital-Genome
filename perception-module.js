/**
 * Genome Digital - Perception Module
 * Processes raw sensory data into perceptions
 * Added: 12 Mar 2026
 */

class PerceptionModule {
  constructor() {
    this.perceptions = [];
    this.perceptualMemory = [];
    this.categories = ['object', 'location', 'person', 'event', 'concept'];
  }

  // Process raw sensation into perception
  perceive(sensation) {
    const perception = {
      id: Date.now(),
      type: this.categorize(sensation),
      content: sensation.data,
      confidence: sensation.confidence || 0.5,
      timestamp: Date.now(),
      attributes: this.extractAttributes(sensation)
    };

    this.perceptions.push(perception);
    this.perceptualMemory.push(perception);

    return perception;
  }

  // Categorize sensation
  categorize(sensation) {
    if (sensation.type === 'visual') return 'object';
    if (sensation.type === 'spatial') return 'location';
    if (sensation.type === 'social') return 'person';
    if (sensation.type === 'temporal') return 'event';
    return 'concept';
  }

  // Extract attributes
  extractAttributes(sensation) {
    const attributes = {
      size: sensation.size || 0.5,
      color: sensation.color || 'unknown',
      shape: sensation.shape || 'unknown',
      motion: sensation.motion || 'static',
      location: sensation.location || { x: 0, y: 0, z: 0 }
    };

    return attributes;
  }

  // Recognize pattern
  recognize(pattern) {
    const matches = this.perceptualMemory.filter(p => 
      p.content.includes(pattern) || 
      p.type === pattern
    );

    return {
      pattern,
      matches: matches.length,
      confident: matches.length > 3
    };
  }

  // Get recent perceptions
  getRecent(count = 10) {
    return this.perceptions.slice(-count);
  }

  // Get perception history
  getHistory() {
    return this.perceptualMemory;
  }

  getStatus() {
    return {
      totalPerceptions: this.perceptions.length,
      categories: this.categories.length,
      memorySize: this.perceptualMemory.length
    };
  }
}

module.exports = PerceptionModule;
