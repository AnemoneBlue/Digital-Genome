/**
 * Genome Digital - Memory System Integration
 * Coordinates all memory modules
 * Added: 11 Mar 2026
 */

class MemoryIntegration {
  constructor() {
    this.shortTerm = [];
    this.working = [];
    this.longTerm = [];
    this.episodic = [];
    this.semantic = [];
  }

  encode(experience) {
    const memory = {
      id: Date.now(),
      content: experience,
      timestamp: Date.now(),
      importance: Math.random(),
      accessibility: 1.0
    };
    this.shortTerm.push(memory);
    return memory;
  }

  consolidate() {
    const toConsolidate = this.shortTerm.filter(m => m.importance > 0.5);
    toConsolidate.forEach(m => {
      this.longTerm.push({ ...m, type: 'semantic' });
    });
    this.shortTerm = this.shortTerm.filter(m => m.importance <= 0.5);
    return { consolidated: toConsolidate.length };
  }

  retrieve(query) {
    const results = this.longTerm.filter(m => 
      m.content.toLowerCase().includes(query.toLowerCase())
    );
    return results.slice(0, 5);
  }

  forget(oldMemories) {
    this.longTerm = this.longTerm.filter(m => !oldMemories.includes(m.id));
  }
}

module.exports = MemoryIntegration;
