/**
 * Genome Digital - Episodic Memory
 * Specific personal experiences with context
 * Added: 11 Mar 2026
 */

class EpisodicMemory {
  constructor() {
    this.episodes = [];
    this.emotionalEpisode = [];
  }

  encodeEpisode(what, where, when, emotionalSignificance = 0.5) {
    const episode = {
      id: Date.now(),
      what,
      where,
      when: when || Date.now(),
      emotionalSignificance,
      details: {},
      recalled: 0,
      vividness: 0.5,
      timestamp: Date.now()
    };
    
    this.episodes.push(episode);
    
    if (emotionalSignificance > 0.7) {
      this.emotionalEpisode.push(episode);
    }
    
    return episode;
  }

  recall(episodeId) {
    const episode = this.episodes.find(e => e.id === episodeId);
    if (episode) {
      episode.recalled++;
      episode.vividness = Math.min(1, episode.vividness + 0.05);
    }
    return episode;
  }

  search(criteria) {
    let results = this.episodes;
    
    if (criteria.where) {
      results = results.filter(e => 
        e.where.toLowerCase().includes(criteria.where.toLowerCase())
      );
    }
    
    if (criteria.emotionalSignificance) {
      results = results.filter(e => 
        e.emotionalSignificance >= criteria.emotionalSignificance
      );
    }
    
    return results;
  }

  getRecentEpisodes(count = 10) {
    return [...this.episodes]
      .sort((a, b) => b.when - a.when)
      .slice(0, count);
  }

  getEmotionalEpisodes() {
    return this.emotionalEpisode.sort((a, b) => 
      b.emotionalSignificance - a.emotionalSignificance
    );
  }

  getFlashbulbMemories() {
    return this.episodes.filter(e => 
      e.emotionalSignificance > 0.9 && e.recalled > 3
    );
  }

  formMemoryChain(episodeIds) {
    return episodeIds.map(id => this.episodes.find(e => e.id === id));
  }
}

module.exports = EpisodicMemory;
