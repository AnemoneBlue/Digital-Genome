/**
 * Genome Digital - Social Relationships Module
 * Manages connections, trust, and social bonds
 * Added: 11 Mar 2026
 */

class SocialRelationshipsModule {
  constructor() {
    this.relationships = new Map();
    this.interactions = [];
  }

  addRelationship(name, type = 'acquaintance', initialTrust = 0.5) {
    const relationship = {
      name,
      type,
      trust: initialTrust,
      familiarity: 0,
      lastInteraction: null,
      interactions: 0,
      sharedMemories: []
    };
    this.relationships.set(name, relationship);
    return relationship;
  }

  interact(targetName, interactionType, content = '') {
    const relationship = this.relationships.get(targetName);
    if (!relationship) {
      return { error: 'Relationship not found' };
    }
    
    relationship.lastInteraction = Date.now();
    relationship.interactions++;
    relationship.familiarity = Math.min(1, relationship.interactions / 10);
    
    if (interactionType === 'positive') {
      relationship.trust = Math.min(1, relationship.trust + 0.05);
    } else if (interactionType === 'negative') {
      relationship.trust = Math.max(0, relationship.trust - 0.1);
    }
    
    this.interactions.push({
      target: targetName,
      type: interactionType,
      content,
      timestamp: Date.now()
    });
    
    return relationship;
  }

  getRelationship(targetName) {
    return this.relationships.get(targetName) || null;
  }

  getAllRelationships() {
    return Array.from(this.relationships.values());
  }

  getClosestRelationships(count = 5) {
    return this.getAllRelationships()
      .sort((a, b) => b.trust - a.trust)
      .slice(0, count);
  }

  buildTrust(targetName, amount = 0.1) {
    const relationship = this.relationships.get(targetName);
    if (relationship) {
      relationship.trust = Math.min(1, relationship.trust + amount);
    }
    return relationship;
  }

  breakTrust(targetName, amount = 0.2) {
    const relationship = this.relationships.get(targetName);
    if (relationship) {
      relationship.trust = Math.max(0, relationship.trust - amount);
    }
    return relationship;
  }

  shareMemory(targetName, memory) {
    const relationship = this.relationships.get(targetName);
    if (relationship) {
      relationship.sharedMemories.push({
        memory,
        timestamp: Date.now()
      });
    }
    return relationship;
  }

  getSocialNetwork() {
    const relationships = this.getAllRelationships();
    return {
      total: relationships.length,
      byType: relationships.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      }, {}),
      averageTrust: relationships.reduce((sum, r) => sum + r.trust, 0) / relationships.length || 0
    };
  }
}

module.exports = SocialRelationshipsModule;
