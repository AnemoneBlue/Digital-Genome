/**
 * Genome Digital - Memory Consolidation Module
 * Transfers memories from short-term to long-term storage
 * Added: 12 Mar 2026
 */

class MemoryConsolidation {
  constructor() {
    this.shortTermMemory = [];
    this.longTermMemory = [];
    this.consolidationThreshold = 5; // times accessed before consolidation
    this.accessCounts = {};
    this.lastConsolidation = Date.now();
  }

  // Add to short-term memory
  addToShortTerm(memory) {
    const item = {
      id: Date.now(),
      content: memory.content,
      encoding: memory.encoding || 'semantic',
      timestamp: Date.now(),
      accessCount: 0,
      emotionalValue: memory.emotionalValue || 0
    };

    this.shortTermMemory.push(item);
    this.accessCounts[item.id] = 0;

    return { added: true, location: 'short-term', id: item.id };
  }

  // Access a memory (increases access count)
  access(memoryId) {
    // Check short-term
    let item = this.shortTermMemory.find(m => m.id === memoryId);
    if (item) {
      this.accessCounts[memoryId]++;
      return { accessed: true, location: 'short-term', item };
    }

    // Check long-term
    item = this.longTermMemory.find(m => m.id === memoryId);
    if (item) {
      item.lastAccessed = Date.now();
      return { accessed: true, location: 'long-term', item };
    }

    return { accessed: false };
  }

  // Consolidate memories to long-term
  consolidate() {
    const consolidated = [];
    const remaining = [];

    this.shortTermMemory.forEach(item => {
      const accessCount = this.accessCounts[item.id] || 0;
      
      // Consolidate if accessed enough times or has high emotional value
      if (accessCount >= this.consolidationThreshold || item.emotionalValue > 0.8) {
        this.longTermMemory.push({
          ...item,
          consolidatedAt: Date.now(),
          strength: Math.min(1, accessCount / 10 + item.emotionalValue * 0.3)
        });
        consolidated.push(item.id);
      } else {
        remaining.push(item);
      }
    });

    this.shortTermMemory = remaining;
    this.lastConsolidation = Date.now();

    return {
      consolidated: consolidated.length,
      remaining: remaining.length,
      timestamp: Date.now()
    };
  }

  // Get memory by content search
  recall(query) {
    const results = this.longTermMemory.filter(m => 
      m.content.toLowerCase().includes(query.toLowerCase())
    );

    return {
      query,
      found: results.length,
      results
    };
  }

  // Get all memories
  getAllMemories() {
    return {
      shortTerm: this.shortTermMemory.length,
      longTerm: this.longTermMemory.length,
      total: this.shortTermMemory.length + this.longTermMemory.length
    };
  }

  // Get status
  getStatus() {
    return {
      shortTermCount: this.shortTermMemory.length,
      longTermCount: this.longTermMemory.length,
      lastConsolidation: this.lastConsolidation,
      accessCounts: Object.keys(this.accessCounts).length
    };
  }
}

module.exports = MemoryConsolidation;
