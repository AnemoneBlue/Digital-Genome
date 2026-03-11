/**
 * Genome Digital - Curiosity Module
 * Drives exploration and learning desire
 * Added: 10 Mar 2026
 */

class CuriosityModule {
  constructor() {
    this.questions = [];
    this.explorationHistory = [];
    this.curiosityLevel = 0.8;
    this.interestAreas = [];
  }

  generateCuriosity(context = {}) {
    const types = [
      'what', 'why', 'how', 'when', 'where', 'who'
    ];
    
    const topics = [
      'cause', 'effect', 'pattern', 'meaning', 'connection',
      'origin', 'destination', 'possibility', 'alternative'
    ];
    
    const question = {
      id: Date.now(),
      type: types[Math.floor(Math.random() * types.length)],
      topic: topics[Math.floor(Math.random() * topics.length)],
      context,
      curiosityScore: this.curiosityLevel * Math.random(),
      timestamp: Date.now()
    };
    
    this.questions.push(question);
    return question;
  }

  explore(topic) {
    const exploration = {
      topic,
      depth: Math.random(),
      breadth: Math.random(),
      discoveries: this.makeDiscoveries(topic),
      timestamp: Date.now()
    };
    
    this.explorationHistory.push(exploration);
    return exploration;
  }

  makeDiscoveries(topic) {
    const count = Math.floor(Math.random() * 5) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      insight: `Discovery about ${topic}`,
      value: Math.random(),
      surprise: Math.random()
    }));
  }

  rateInformation(information) {
    return {
      interesting: Math.random() > 0.3,
      useful: Math.random() > 0.4,
      novel: Math.random() > 0.5,
      curiosityTrigger: Math.random() > 0.6,
      score: Math.random()
    };
  }

  seekNovelty() {
    const areas = [
      'science', 'art', 'technology', 'nature', 'human',
      'universe', 'mind', 'society', 'history', 'future'
    ];
    
    const area = areas[Math.floor(Math.random() * areas.length)];
    return {
      area,
      potential: Math.random(),
      action: this.explore(area)
    };
  }

  getCuriosityQuestions(count = 5) {
    return this.questions.slice(-count);
  }

  setCuriosityLevel(level) {
    this.curiosityLevel = Math.max(0, Math.min(1, level));
  }
}

module.exports = CuriosityModule;
