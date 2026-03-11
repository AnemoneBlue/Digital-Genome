/**
 * Genome Digital - Concept Formation
 * Creating abstract ideas from examples
 * Added: 11 Mar 2026
 */

class ConceptFormation {
  constructor() {
    this.concepts = new Map();
    this.examples = new Map();
    this.features = new Set();
  }

  createConcept(name, examples) {
    const features = this.extractFeatures(examples);
    const essential = this.identifyEssentialFeatures(features);
    
    const concept = {
      name,
      examples: examples.length,
      features,
      essential,
      prototype: this.createPrototype(examples),
      created: Date.now()
    };
    
    this.concepts.set(name, concept);
    this.examples.set(name, examples);
    
    return concept;
  }

  extractFeatures(examples) {
    const featureCounts = {};
    
    examples.forEach(example => {
      if (typeof example === 'object') {
        Object.keys(example).forEach(key => {
          featureCounts[key] = (featureCounts[key] || 0) + 1;
        });
      }
    });
    
    return Object.entries(featureCounts)
      .map(([feature, count]) => ({
        feature,
        frequency: count / examples.length
      }))
      .sort((a, b) => b.frequency - a.frequency);
  }

  identifyEssentialFeatures(features) {
    return features
      .filter(f => f.frequency > 0.7)
      .map(f => f.feature);
  }

  createPrototype(examples) {
    if (typeof examples[0] === 'object') {
      const prototype = {};
      Object.keys(examples[0]).forEach(key => {
        const values = examples.map(e => e[key]);
        const numeric = values.every(v => typeof v === 'number');
        
        if (numeric) {
          prototype[key] = values.reduce((a, b) => a + b, 0) / values.length;
        } else {
          prototype[key] = values.sort((a, b) =>
            values.filter(v => v === a).length - values.filter(v => v === b).length
          ).pop();
        }
      });
      return prototype;
    }
    
    return examples[Math.floor(examples.length / 2)];
  }

  categorize(instance) {
    let bestMatch = null;
    let bestScore = 0;
    
    for (const [name, concept] of this.concepts) {
      const score = this.calculateSimilarity(instance, concept.prototype);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = name;
      }
    }
    
    return {
      category: bestMatch,
      confidence: bestScore,
      instance
    };
  }

  calculateSimilarity(instance, prototype) {
    if (typeof instance !== 'object') {
      return instance === prototype ? 1 : 0;
    }
    
    let matches = 0;
    let total = 0;
    
    for (const key of Object.keys(prototype)) {
      if (instance[key] !== undefined) {
        total++;
        if (typeof prototype[key] === 'number') {
          const diff = Math.abs(instance[key] - prototype[key]);
          if (diff < prototype[key] * 0.2) matches++;
        } else if (instance[key] === prototype[key]) {
          matches++;
        }
      }
    }
    
    return total > 0 ? matches / total : 0;
  }

  generalize(conceptName, newExample) {
    const examples = this.examples.get(conceptName) || [];
    examples.push(newExample);
    this.examples.set(conceptName, examples);
    
    const updated = this.extractFeatures(examples);
    this.concepts.get(conceptName).features = updated;
    this.concepts.get(conceptName).examples = examples.length;
    
    return this.concepts.get(conceptName);
  }
}

module.exports = ConceptFormation;
