/**
 * Genome Digital - Memory Consolidation
 * From short-term to long-term storage
 * Added: 11 Mar 2026
 */

class MemoryConsolidation {
  constructor() {
    this.stages = ['encoding', 'short_term', 'consolidation', 'long_term'];
    this.memories = [];
    this.consolidationQueue = [];
  }

  encode(experience) {
    const memory = {
      id: Date.now(),
      experience,
      stage: 'encoding',
      strength: 0.1,
      created: Date.now(),
      consolidated: false
    };
    
    this.memories.push(memory);
    return memory;
  }

  transferToShortTerm(memoryId) {
    const memory = this.memories.find(m => m.id === memoryId);
    if (memory) {
      memory.stage = 'short_term';
      memory.strength = 0.3;
    }
    return memory;
  }

  consolidate(memoryId) {
    const memory = this.memories.find(m => m.id === memoryId);
    if (!memory) return { error: 'Memory not found' };
    
    memory.stage = 'consolidation';
    memory.consolidatedAt = Date.now();
    
    this.consolidationQueue.push(memory);
    
    return {
      memory,
      status: 'consolidating',
      estimatedTime: '24 hours'
    };
  }

  completeConsolidation(memoryId) {
    const memory = this.memories.find(m => m.id === memoryId);
    if (memory) {
      memory.stage = 'long_term';
      memory.strength = 0.9;
      memory.consolidated = true;
    }
    return memory;
  }

  getMemoryByStage(stage) {
    return this.memories.filter(m => m.stage === stage);
  }

  strengthen(memoryId, amount = 0.1) {
    const memory = this.memories.find(m => m.id === memoryId);
    if (memory) {
      memory.strength = Math.min(1, memory.strength + amount);
      
      if (memory.strength > 0.8 && memory.stage === 'short_term') {
        this.consolidate(memoryId);
      }
    }
    return memory;
  }

  getConsolidationProgress() {
    return {
      encoding: this.memories.filter(m => m.stage === 'encoding').length,
      shortTerm: this.memories.filter(m => m.stage === 'short_term').length,
      consolidating: this.memories.filter(m => m.stage === 'consolidation').length,
      longTerm: this.memories.filter(m => m.stage === 'long_term').length
    };
  }
}

module.exports = MemoryConsolidation;
