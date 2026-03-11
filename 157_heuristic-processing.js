/**
 * Genome Digital - Heuristic Processing
 * Mental shortcuts and rules of thumb
 * Added: 11 Mar 2026
 */

class HeuristicProcessing {
  constructor() {
    this.heuristics = new Map();
    this.biases = [];
  }

  registerHeuristic(name, function_) {
    this.heuristics.set(name, {
      function: function_,
      used: 0,
      success: 0
    });
    
    return { registered: name };
  }

  apply(heuristicName, problem) {
    const heuristic = this.heuristics.get(heuristicName);
    if (!heuristic) {
      return { error: 'Heuristic not found' };
    }
    
    const startTime = Date.now();
    const result = heuristic.function(problem);
    const duration = Date.now() - startTime;
    
    heuristic.used++;
    if (result.success) {
      heuristic.success++;
    }
    
    return {
      heuristic: heuristicName,
      result,
      duration,
      heuristic: true
    };
  }

  availability(events) {
    const memorable = events
      .filter(e => e.emotionalIntensity > 0.5)
      .sort((a, b) => b.emotionalIntensity - a.emotionalIntensity);
    
    return {
      estimation: memorable.length / events.length,
      method: 'availability',
      basedOn: 'ease of recollection'
    };
  }

  representativeness(sample, population) {
    const matchCount = sample.filter(s =>
      population.includes(s)
    ).length;
    
    return {
      representative: matchCount / sample.length > 0.7,
      confidence: matchCount / sample.length
    };
  }

  anchoringAdjustment(anchor, adjustment) {
    const direction = adjustment > 0 ? 'up' : 'down';
    const adjusted = anchor + (adjustment * 0.4);
    
    return {
      anchor,
      adjustment,
      adjusted,
      direction,
      biased: Math.abs(adjusted - anchor) < Math.abs(adjustment)
    };
  }

  getHeuristicStats() {
    const stats = [];
    
    for (const [name, data] of this.heuristics) {
      stats.push({
        name,
        used: data.used,
        success: data.success,
        rate: data.used > 0 ? data.success / data.used : 0
      });
    }
    
    return stats;
  }
}

module.exports = HeuristicProcessing;
