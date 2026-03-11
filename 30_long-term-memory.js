/**
 * 🗃️ Long-Term Memory System
 * Memory encoding, storage, and retrieval
 */

class LongTermMemory {
  constructor() {
    this.memories = new Map();
    this.workingMemory = [];
    this.episodicMemory = [];
    this.semanticMemory = new Map();
    this.proceduralMemory = new Map();
    this.capacity = 1e15; // bits (theoretical)
  }

  // Encode new memory
  encode(experience, type = 'episodic') {
    const memory = {
      id: this.generateId(),
      content: experience,
      type,
      timestamp: Date.now(),
      importance: this.calculateImportance(experience),
      emotionalValence: experience.emotion || 0,
      context: experience.context || {},
      strength: 0.1, // Initial strength
      accessCount: 0,
      associations: []
    };

    this.memories.set(memory.id, memory);

    if (type === 'episodic') {
      this.episodicMemory.push(memory);
    } else if (type === 'semantic') {
      this.semanticMemory.set(experience.concept, memory);
    } else if (type === 'procedural') {
      this.proceduralMemory.set(experience.skill, memory);
    }

    // Consolidation to long-term storage
    this.consolidate(memory);

    return memory;
  }

  // Retrieve memory
  retrieve(query, type = 'all') {
    const results = [];

    if (type === 'episodic' || type === 'all') {
      for (const memory of this.episodicMemory) {
        if (this.matchesQuery(memory, query)) {
          memory.accessCount++;
          results.push(memory);
        }
      }
    }

    if (type === 'semantic' || type === 'all') {
      for (const [concept, memory] of this.semanticMemory) {
        if (concept.includes(query) || memory.content.includes(query)) {
          memory.accessCount++;
          results.push(memory);
        }
      }
    }

    return results.sort((a, b) => b.importance - a.importance);
  }

  // Forgetting mechanism
  forget(memoryId, decay = 0.01) {
    const memory = this.memories.get(memoryId);
    if (memory) {
      memory.strength -= decay;
      if (memory.strength <= 0) {
        this.memories.delete(memoryId);
        return true; // Fully forgotten
      }
    }
    return false;
  }

  // Memory consolidation
  consolidate(memory) {
    // Sleep-dependent consolidation
    setTimeout(() => {
      memory.strength = Math.min(1, memory.strength * 1.5);
      memory.consolidated = true;
    }, 24 * 60 * 60 * 1000); // After 24 hours

    return memory;
  }

  // Working memory operations
  addToWorkingMemory(item) {
    if (this.workingMemory.length >= 7) {
      this.workingMemory.shift(); // Remove oldest
    }
    this.workingMemory.push({
      item,
      timestamp: Date.now()
    });
    return this.workingMemory;
  }

  // Create associations between memories
  associate(memoryId1, memoryId2, strength = 0.5) {
    const memory1 = this.memories.get(memoryId1);
    const memory2 = this.memories.get(memoryId2);

    if (memory1 && memory2) {
      memory1.associations.push({ id: memoryId2, strength });
      memory2.associations.push({ id: memoryId1, strength });
      return true;
    }
    return false;
  }

  // Retrieval by association
  retrieveByAssociation(memoryId) {
    const memory = this.memories.get(memoryId);
    if (!memory) return [];

    const associated = [];
    for (const assoc of memory.associations) {
      const associatedMemory = this.memories.get(assoc.id);
      if (associatedMemory) {
        associated.push(associatedMemory);
      }
    }

    return associated;
  }

  calculateImportance(experience) {
    let importance = 0.5;

    if (experience.emotion) {
      importance += Math.abs(experience.emotion) * 0.3;
    }
    if (experience.repetition) {
      importance += experience.repetition * 0.1;
    }
    if (experience.novelty) {
      importance += 0.2;
    }

    return Math.min(1, importance);
  }

  matchesQuery(memory, query) {
    const content = JSON.stringify(memory.content).toLowerCase();
    return content.includes(query.toLowerCase());
  }

  generateId() {
    return 'mem_' + Math.random().toString(36).substr(2, 9);
  }

  getMemoryStats() {
    return {
      total: this.memories.size,
      episodic: this.episodicMemory.length,
      semantic: this.semanticMemory.size,
      procedural: this.proceduralMemory.size,
      workingMemorySize: this.workingMemory.length,
      capacity: this.capacity,
      usedCapacity: this.memories.size * 1000 / this.capacity
    };
  }

  // Explicit memory (declarative) vs Implicit memory
  getMemoryType(memoryId) {
    const memory = this.memories.get(memoryId);
    if (!memory) return null;

    return {
      explicit: memory.type === 'episodic' || memory.type === 'semantic',
      implicit: memory.type === 'procedural',
      declarative: memory.type !== 'procedural',
      nonDeclarative: memory.type === 'procedural'
    };
  }
}

module.exports = new LongTermMemory();
