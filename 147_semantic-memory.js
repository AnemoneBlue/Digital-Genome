/**
 * Genome Digital - Semantic Memory
 * Facts, concepts, and general knowledge
 * Added: 11 Mar 2026
 */

class SemanticMemory {
  constructor() {
    this.concepts = new Map();
    this.facts = [];
    this.categories = new Map();
  }

  learnConcept(concept, definition, category = 'general') {
    const learned = {
      concept,
      definition,
      category,
      learnedAt: Date.now(),
      strength: 0.5,
      connections: []
    };
    
    this.concepts.set(concept, learned);
    
    if (!this.categories.has(category)) {
      this.categories.set(category, []);
    }
    this.categories.get(category).push(concept);
    
    return learned;
  }

  addFact(fact, source = 'unknown', confidence = 0.8) {
    const newFact = {
      id: Date.now(),
      fact,
      source,
      confidence,
      timestamp: Date.now(),
      verified: false
    };
    
    this.facts.push(newFact);
    return newFact;
  }

  connect(conceptA, conceptB, relationship = 'related') {
    const concept1 = this.concepts.get(conceptA);
    const concept2 = this.concepts.get(conceptB);
    
    if (concept1 && concept2) {
      concept1.connections.push({ to: conceptB, relationship });
      concept2.connections.push({ to: conceptA, relationship });
    }
    
    return { connected: true, conceptA, conceptB, relationship };
  }

  retrieve(query) {
    const results = [];
    
    for (const [concept, data] of this.concepts) {
      if (concept.toLowerCase().includes(query.toLowerCase()) ||
          data.definition.toLowerCase().includes(query.toLowerCase())) {
        results.push({ concept, ...data });
      }
    }
    
    return results;
  }

  getConcept(concept) {
    return this.concepts.get(concept);
  }

  strengthenConcept(concept, amount = 0.1) {
    const data = this.concepts.get(concept);
    if (data) {
      data.strength = Math.min(1, data.strength + amount);
    }
    return data;
  }

  getCategory(category) {
    return this.categories.get(category) || [];
  }

  getKnowledgeGraph() {
    const nodes = [];
    const links = [];
    
    for (const [concept, data] of this.concepts) {
      nodes.push({ id: concept, category: data.category });
      
      for (const connection of data.connections) {
        links.push({ source: concept, target: connection.to });
      }
    }
    
    return { nodes, links };
  }
}

module.exports = SemanticMemory;
