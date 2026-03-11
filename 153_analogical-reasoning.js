/**
 * Genome Digital - Analogical Reasoning
 * Mapping relationships between domains
 * Added: 11 Mar 2026
 */

class AnalogicalReasoning {
  constructor() {
    this.mappings = new Map();
    this.sourceDomains = new Map();
    this.targetDomains = new Map();
  }

  createAnalogy(source, target, mapping) {
    const analogy = {
      id: Date.now(),
      source,
      target,
      mapping,
      strength: this.calculateMappingStrength(mapping),
      created: Date.now()
    };
    
    this.mappings.set(`${source}-${target}`, analogy);
    
    if (!this.sourceDomains.has(source)) {
      this.sourceDomains.set(source, []);
    }
    this.sourceDomains.get(source).push(analogy);
    
    return analogy;
  }

  calculateMappingStrength(mapping) {
    const weights = mapping.map(m => m.similarity || 0.5);
    return weights.reduce((a, b) => a + b, 0) / weights.length;
  }

  applyAnalogy(sourceProblem, targetDomain) {
    const analogies = this.mappings.get(`${sourceProblem}-${targetDomain}`);
    
    if (!analogies) {
      return { found: false, suggestion: 'Learn more analogies first' };
    }
    
    return {
      found: true,
      analogy,
      solution: this.inferSolution(analogy)
    };
  }

  inferSolution(analogy) {
    return {
      basedOn: analogy.source,
      inferred: true,
      confidence: analogy.strength
    };
  }

  mapStructures(sourceStructure, targetStructure) {
    const mapping = [];
    
    const sourceKeys = Object.keys(sourceStructure);
    const targetKeys = Object.keys(targetStructure);
    
    const maxLength = Math.min(sourceKeys.length, targetKeys.length);
    
    for (let i = 0; i < maxLength; i++) {
      mapping.push({
        from: sourceKeys[i],
        to: targetKeys[i],
        similarity: Math.random() * 0.5 + 0.5
      });
    }
    
    return mapping;
  }

  evaluateAnalogy(source, target) {
    const analogy = this.mappings.get(`${source}-${target}`);
    
    if (!analogy) {
      return { exists: false };
    }
    
    return {
      exists: true,
      strength: analogy.strength,
      mapping: analogy.mapping,
      quality: analogy.strength > 0.7 ? 'strong' : 'weak'
    };
  }

  transfer(sourceProblem, targetProblem) {
    const sourceAnalogy = this.findBestAnalogy(sourceProblem);
    
    if (!sourceAnalogy) {
      return { transferred: false };
    }
    
    const transfer = this.applyMapping(
      sourceAnalogy.mapping,
      targetProblem
    );
    
    return {
      transferred: true,
      solution: transfer,
      confidence: sourceAnalogy.strength
    };
  }

  findBestAnalogy(problem) {
    const analogies = this.sourceDomains.get(problem);
    if (!analogies || analogies.length === 0) return null;
    
    return analogies.sort((a, b) => b.strength - a.strength)[0];
  }

  applyMapping(mapping, target) {
    const result = {};
    
    mapping.forEach(m => {
      if (target[m.from] !== undefined) {
        result[m.to] = target[m.from];
      }
    });
    
    return result;
  }
}

module.exports = AnalogicalReasoning;
