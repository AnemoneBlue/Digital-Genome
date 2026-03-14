/**
 * ================================================================================
 * GENOME DIGITAL - MEMORY MODULE v2.0
 * ================================================================================
 * Complete memory system with short-term, long-term, and episodic memory
 * ================================================================================
 */

class MemoryModule {
  constructor(options = {}) {
    // Configuration
    this.shortTermCapacity = options.shortTermCapacity || 7; // Miller's Law
    this.longTermCapacity = options.longTermCapacity || 10000;
    this.consolidationThreshold = options.consolidationThreshold || 5;
    
    // Memory Stores
    this.sensoryMemory = [];      // Raw sensory data (seconds)
    this.shortTermMemory = [];    // Working memory (minutes)
    this.longTermMemory = [];     // Permanent storage (indefinite)
    this.episodicMemory = [];     // Autobiographical events
    this.semanticMemory = [];      // Factual knowledge
    this.proceduralMemory = [];   // Skills & habits
    
    // Memory Metadata
    this.accessCounts = {};
    this.emotionalValence = {};
    this.strength = {};
    
    // System State
    this.currentFocus = null;
    this.lastConsolidation = Date.now();
    this.consolidationInterval = options.consolidationInterval || 300000; // 5 min
  }

  // ============================================================================
  // ENCODING - Convert experience to memory
  // ============================================================================
  
  encode(experience) {
    const memory = {
      id: this.generateId(),
      content: experience.content,
      type: experience.type || 'episodic', // episodic, semantic, procedural
      timestamp: Date.now(),
      encoding: this.determineEncoding(experience),
      importance: this.calculateImportance(experience),
      emotionalValence: experience.emotion || 0,
      strength: 0.1, // Initial strength
      accessCount: 0,
      lastAccessed: null,
      associations: [],
      context: experience.context || {}
    };
    
    // Route to appropriate memory store
    switch(memory.type) {
      case 'semantic':
        this.semanticMemory.push(memory);
        break;
      case 'procedural':
        this.proceduralMemory.push(memory);
        break;
      default:
        this.shortTermMemory.push(memory);
    }
    
    // Maintain working memory capacity
    this.maintainWorkingMemory();
    
    return { encoded: true, memoryId: memory.id, type: memory.type };
  }
  
  determineEncoding(experience) {
    // Determine best encoding strategy
    if (experience.visual) return 'visual';
    if (experience.auditory) return 'auditory';
    if (experience.semantic) return 'semantic';
    if (experience.procedural) return 'procedural';
    return 'mixed';
  }
  
  calculateImportance(experience) {
    let importance = 0.5; // Base
    
    // Emotional events are more important
    if (Math.abs(experience.emotion || 0) > 0.7) importance += 0.3;
    
    // Repetition increases importance
    if (experience.repetition) importance += experience.repetition * 0.1;
    
    // Relevance to goals
    if (experience.goalRelevant) importance += 0.2;
    
    // Novelty
    if (experience.novel) importance += 0.2;
    
    return Math.min(1, importance);
  }

  // ============================================================================
  // STORAGE - Store in appropriate memory system
  // ============================================================================
  
  store(content, type = 'episodic', options = {}) {
    const memory = {
      id: this.generateId(),
      content,
      type,
      timestamp: Date.now(),
      importance: options.importance || 0.5,
      emotionalValence: options.emotion || 0,
      strength: options.strength || 0.3,
      decayRate: this.calculateDecayRate(type),
      accessCount: 0,
      lastAccessed: null,
      associations: options.associations || [],
      metadata: options.metadata || {}
    };
    
    // Add to appropriate store
    if (type === 'semantic') {
      this.semanticMemory.push(memory);
    } else if (type === 'procedural') {
      this.proceduralMemory.push(memory);
    } else {
      this.episodicMemory.push(memory);
    }
    
    return { stored: true, memoryId: memory.id };
  }
  
  calculateDecayRate(type) {
    const rates = {
      sensory: 0.9,      // Very fast decay
      shortTerm: 0.5,   // Fast decay
      episodic: 0.1,     // Slow decay
      semantic: 0.01,    // Very slow decay
      procedural: 0.001  // Almost no decay
    };
    return rates[type] || 0.1;
  }

  // ============================================================================
  // RETRIEVAL - Recall memories
  // ============================================================================
  
  recall(query, options = {}) {
    const searchType = options.type || 'all';
    const limit = options.limit || 10;
    const threshold = options.threshold || 0.1;
    
    let results = [];
    
    // Search appropriate stores
    if (searchType === 'all' || searchType === 'episodic') {
      results = results.concat(this.searchMemory(this.episodicMemory, query));
    }
    if (searchType === 'all' || searchType === 'semantic') {
      results = results.concat(this.searchMemory(this.semanticMemory, query));
    }
    if (searchType === 'all' || searchType === 'procedural') {
      results = results.concat(this.searchMemory(this.proceduralMemory, query));
    }
    
    // Filter by threshold
    results = results.filter(r => r.relevance >= threshold);
    
    // Sort by relevance and recency
    results.sort((a, b) => {
      const scoreA = a.relevance * (1 + a.strength);
      const scoreB = b.relevance * (1 + b.strength);
      return scoreB - scoreA;
    });
    
    // Limit results
    results = results.slice(0, limit);
    
    // Update access metadata
    results.forEach(r => this.updateAccess(r.id));
    
    return {
      results,
      count: results.length,
      query
    };
  }
  
  searchMemory(store, query) {
    const queryLower = query.toLowerCase();
    
    return store.map(memory => {
      let relevance = 0;
      
      // Direct content match
      if (typeof memory.content === 'string') {
        if (memory.content.toLowerCase().includes(queryLower)) {
          relevance += 0.8;
        }
      }
      
      // Association matching
      memory.associations.forEach(assoc => {
        if (assoc.toLowerCase().includes(queryLower)) {
          relevance += 0.4;
        }
      });
      
      // Context matching
      if (memory.context) {
        Object.values(memory.context).forEach(val => {
          if (String(val).toLowerCase().includes(queryLower)) {
            relevance += 0.3;
          }
        });
      }
      
      return {
        ...memory,
        relevance
      };
    }).filter(m => m.relevance > 0);
  }
  
  updateAccess(memoryId) {
    // Find and update memory
    const allMemories = [
      ...this.episodicMemory,
      ...this.semanticMemory,
      ...this.proceduralMemory
    ];
    
    const memory = allMemories.find(m => m.id === memoryId);
    if (memory) {
      memory.accessCount++;
      memory.lastAccessed = Date.now();
      memory.strength = Math.min(1, memory.strength + 0.05);
    }
  }

  // ============================================================================
  // CONSOLIDATION - Transfer to long-term memory
  // ============================================================================
  
  consolidate() {
    const consolidated = [];
    const now = Date.now();
    
    // Check if consolidation is needed
    if (now - this.lastConsolidation < this.consolidationInterval) {
      return { consolidated: 0, reason: 'too_soon' };
    }
    
    // Process short-term memories
    const toConsolidate = this.shortTermMemory.filter(m => {
      const accesses = this.accessCounts[m.id] || 0;
      return accesses >= this.consolidationThreshold || m.importance > 0.8;
    });
    
    toConsolidate.forEach(memory => {
      // Determine destination based on type
      if (memory.type === 'episodic') {
        this.episodicMemory.push({
          ...memory,
          consolidatedAt: now,
          strength: Math.min(1, memory.strength + 0.2)
        });
      } else if (memory.type === 'semantic') {
        this.semanticMemory.push({
          ...memory,
          consolidatedAt: now
        });
      }
      
      // Remove from short-term
      const idx = this.shortTermMemory.findIndex(m => m.id === memory.id);
      if (idx !== -1) this.shortTermMemory.splice(idx, 1);
      
      consolidated.push(memory.id);
    });
    
    this.lastConsolidation = now;
    
    return {
      consolidated: consolidated.length,
      timestamp: now
    };
  }

  // ============================================================================
  // FORGETTING - Natural decay and interference
  // ============================================================================
  
  applyDecay() {
    const now = Date.now();
    
    // Decay short-term memories
    this.shortTermMemory = this.shortTermMemory.filter(memory => {
      const timeSinceAccess = memory.lastAccessed 
        ? now - memory.lastAccessed 
        : now - memory.timestamp;
      
      const decay = Math.exp(-this.decayRate * (timeSinceAccess / 60000));
      return decay > 0.1;
    });
    
    // Decay episodic strength
    this.episodicMemory.forEach(memory => {
      const timeSinceAccess = memory.lastAccessed || memory.timestamp;
      const decay = Math.exp(-memory.decayRate * ((now - timeSinceAccess) / 3600000));
      memory.strength = Math.max(0.1, memory.strength * decay);
    });
  }
  
  forget(memoryId) {
    const allStores = [
      { store: this.shortTermMemory, name: 'shortTerm' },
      { store: this.episodicMemory, name: 'episodic' },
      { store: this.semanticMemory, name: 'semantic' },
      { store: this.proceduralMemory, name: 'procedural' }
    ];
    
    for (const { store, name } of allStores) {
      const idx = store.findIndex(m => m.id === memoryId);
      if (idx !== -1) {
        store.splice(idx, 1);
        return { forgotten: true, from: name };
      }
    }
    
    return { forgotten: false };
  }

  // ============================================================================
  // ASSOCIATIONS - Link related memories
  // ============================================================================
  
  associate(memoryId1, memoryId2, strength = 0.5) {
    const memory1 = this.findMemory(memoryId1);
    const memory2 = this.findMemory(memoryId2);
    
    if (memory1 && memory2) {
      memory1.associations.push({ id: memoryId2, strength });
      memory2.associations.push({ id: memoryId1, strength });
      return { associated: true };
    }
    
    return { associated: false };
  }
  
  findMemory(id) {
    const allMemories = [
      ...this.shortTermMemory,
      ...this.episodicMemory,
      ...this.semanticMemory,
      ...this.proceduralMemory
    ];
    return allMemories.find(m => m.id === id);
  }

  // ============================================================================
  // WORKING MEMORY - Maintain active information
  // ============================================================================
  
  maintainWorkingMemory() {
    while (this.shortTermMemory.length > this.shortTermCapacity) {
      // Remove oldest or weakest
      const oldest = this.shortTermMemory.shift();
      if (oldest.strength > 0.5) {
        // Move to long-term instead of losing
        this.store(oldest.content, oldest.type, {
          strength: oldest.strength * 0.5,
          emotion: oldest.emotionalValence
        });
      }
    }
  }
  
  focusOn(memoryId) {
    this.currentFocus = memoryId;
    this.updateAccess(memoryId);
    return { focusing: true, memoryId };
  }

  // ============================================================================
  // RETRIEVAL CUES - Use one memory to find others
  // ============================================================================
  
  retrieveByAssociation(cueMemoryId) {
    const cue = this.findMemory(cueMemoryId);
    if (!cue) return { results: [] };
    
    const associated = cue.associations || [];
    const results = associated.map(assoc => {
      const memory = this.findMemory(assoc.id);
      return {
        ...memory,
        associationStrength: assoc.strength
      };
    }).filter(Boolean);
    
    return { results, cue: cue.content };
  }

  // ============================================================================
  // STATUS AND STATISTICS
  // ============================================================================
  
  getStatus() {
    return {
      shortTerm: this.shortTermMemory.length,
      episodic: this.episodicMemory.length,
      semantic: this.semanticMemory.length,
      procedural: this.proceduralMemory.length,
      total: this.shortTermMemory.length + this.episodicMemory.length + 
             this.semanticMemory.length + this.proceduralMemory.length,
      capacity: {
        shortTerm: `${this.shortTermMemory.length}/${this.shortTermCapacity}`,
        longTerm: this.longTermMemory.length
      },
      lastConsolidation: this.lastConsolidation,
      currentFocus: this.currentFocus
    };
  }
  
  getStats() {
    const allMemories = [
      ...this.episodicMemory,
      ...this.semanticMemory,
      ...this.proceduralMemory
    ];
    
    const avgStrength = allMemories.reduce((sum, m) => sum + m.strength, 0) / 
                        (allMemories.length || 1);
    
    const avgAccess = allMemories.reduce((sum, m) => sum + m.accessCount, 0) /
                     (allMemories.length || 1);
    
    return {
      totalMemories: allMemories.length,
      averageStrength: avgStrength.toFixed(3),
      averageAccessCount: avgAccess.toFixed(1),
      mostAccessed: this.getMostAccessed(),
      recentMemories: this.getRecent(5)
    };
  }
  
  getMostAccessed() {
    const allMemories = [
      ...this.episodicMemory,
      ...this.semanticMemory,
      ...this.proceduralMemory
    ];
    
    return allMemories
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 5)
      .map(m => ({ id: m.id, content: m.content.substring(0, 50), accesses: m.accessCount }));
  }
  
  getRecent(count = 5) {
    return this.episodicMemory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, count)
      .map(m => ({ id: m.id, content: m.content.substring(0, 50), timestamp: m.timestamp }));
  }

  // ============================================================================
  // UTILITY
  // ============================================================================
  
  generateId() {
    return `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  clear(options = {}) {
    if (options.shortTerm) this.shortTermMemory = [];
    if (options.episodic) this.episodicMemory = [];
    if (options.semantic) this.semanticMemory = [];
    if (options.procedural) this.proceduralMemory = [];
    if (options.all) {
      this.shortTermMemory = [];
      this.episodicMemory = [];
      this.semanticMemory = [];
      this.proceduralMemory = [];
    }
    return { cleared: true };
  }
  
  export() {
    return {
      episodic: this.episodicMemory,
      semantic: this.semanticMemory,
      procedural: this.proceduralMemory,
      exportedAt: Date.now()
    };
  }
  
  import(data) {
    if (data.episodic) this.episodicMemory = data.episodic;
    if (data.semantic) this.semanticMemory = data.semantic;
    if (data.procedural) this.proceduralMemory = data.procedural;
    return { imported: true };
  }
}

// Export
module.exports = MemoryModule;

// Test if run directly
if (require.main === module) {
  const memory = new MemoryModule();
  
  console.log('=== Memory Module Test ===\n');
  
  // Store some memories
  memory.store('Mihai Eminescu wrote "Floare albastră"', 'semantic', {
    importance: 0.9,
    associations: ['poetry', 'romanian', 'literature']
  });
  
  memory.store('Had coffee this morning', 'episodic', {
    emotion: 0.3
  });
  
  // Learn through encoding
  memory.encode({
    content: 'The sky is blue',
    type: 'semantic',
    emotion: 0.2,
    goalRelevant: true
  });
  
  // Recall
  console.log('Recall "Eminescu":');
  console.log(memory.recall('Eminescu'));
  
  console.log('\nStatus:');
  console.log(memory.getStatus());
  
  console.log('\nStats:');
  console.log(memory.getStats());
}

module.exports = MemoryModule;
