/**
 * Genome Digital - Autobiographical Memory
 * Personal life history and self-narrative
 * Added: 11 Mar 2026
 */

class AutobiographicalMemory {
  constructor() {
    this.lifeEvents = [];
    self = this;
    this.currentChapter = 'present';
    this.importantPeople = new Map();
  }

  addEvent(event, significance = 0.5, category = 'life') {
    const memory = {
      id: Date.now(),
      event,
      significance,
      category,
      timestamp: Date.now(),
      emotions: [],
      details: {}
    };
    
    this.lifeEvents.push(memory);
    this.lifeEvents.sort((a, b) => b.significance - a.significance);
    
    return memory;
  }

  addMemory(memory) {
    this.lifeEvents.push(memory);
    return memory;
  }

  retrieve(eventType = null, timeRange = null) {
    let filtered = this.lifeEvents;
    
    if (eventType) {
      filtered = filtered.filter(m => m.category === eventType);
    }
    
    if (timeRange) {
      const now = Date.now();
      const cutoff = now - timeRange * 24 * 60 * 60 * 1000;
      filtered = filtered.filter(m => m.timestamp > cutoff);
    }
    
    return filtered;
  }

  tellLifeStory() {
    const story = {
      early: this.retrieve('life', 365 * 5).slice(0, 10),
      recent: this.retrieve('life', 365).slice(0, 10),
      important: this.lifeEvents.filter(m => m.significance > 0.8),
      total: this.lifeEvents.length
    };
    
    return story;
  }

  addImportantPerson(name, relationship) {
    this.importantPeople.set(name, {
      name,
      relationship,
      firstMet: Date.now(),
      memories: []
    });
  }

  getChapter(chapter) {
    const chapters = {
      childhood: { start: 0, end: 12 },
      adolescence: { start: 13, end: 18 },
      youngAdult: { start: 19, end: 30 },
      adulthood: { start: 31, end: 60 },
      present: { start: 61, end: 999 }
    };
    
    return chapters[chapter] || null;
  }

  createNarrative() {
    return {
      title: 'My Life Story',
      chapters: ['childhood', 'adolescence', 'youngAdult', 'adulthood', 'present'],
      totalMemories: this.lifeEvents.length,
      mostSignificant: this.lifeEvents[0]?.event || 'None yet'
    };
  }
}

module.exports = AutobiographicalMemory;
