/**
 * Genome Digital - Narrative Construction
 * Building coherent life stories
 * Added: 11 Mar 2026
 */

class NarrativeConstruction {
  constructor() {
    this.narratives = [];
    this.currentChapter = null;
  }

  createNarrative(events) {
    const narrative = {
      id: Date.now(),
      events,
      structure: this.organize(events),
      theme: this.extractTheme(events),
      coherence: this.calculateCoherence(events),
      created: Date.now()
    };
    
    this.narratives.push(narrative);
    return narrative;
  }

  organize(events) {
    return {
      beginning: events.slice(0, Math.floor(events.length * 0.2)),
      middle: events.slice(Math.floor(events.length * 0.2), Math.floor(events.length * 0.8)),
      end: events.slice(Math.floor(events.length * 0.8))
    };
  }

  extractTheme(events) {
    const themes = ['growth', 'struggle', 'love', 'loss', 'discovery', 'transformation'];
    return themes[Math.floor(Math.random() * themes.length)];
  }

  calculateCoherence(events) {
    return Math.min(1, events.length / 10);
  }

  updateNarrative(narrativeId, newEvent) {
    const narrative = this.narratives.find(n => n.id === narrativeId);
    if (narrative) {
      narrative.events.push(newEvent);
      narrative.coherence = this.calculateCoherence(narrative.events);
    }
    return narrative;
  }

  tellStory() {
    return {
      narrative: this.narratives[this.narratives.length - 1],
      chapters: this.narratives.length
    };
  }
}

module.exports = NarrativeConstruction;
