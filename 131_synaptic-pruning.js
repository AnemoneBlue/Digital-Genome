/**
 * Genome Digital - Synaptic Pruning
 * Remove unused neural connections - less is more
 * Added: 11 Mar 2026
 */

class SynapticPruning {
  constructor() {
    this.pruned = 0;
    this.pruningThreshold = 0.3;
    this.pruningHistory = [];
  }

  prune(synapse, activity) {
    const shouldPrune = activity < this.pruningThreshold;
    
    if (shouldPrune) {
      this.pruned++;
      
      const pruning = {
        synapse,
        activity,
        pruned: true,
        timestamp: Date.now()
      };
      
      this.pruningHistory.push(pruning);
    }
    
    return { synapse, pruned: shouldPrune, totalPruned: this.pruned };
  }

  setThreshold(threshold) {
    this.pruningThreshold = threshold;
    return { threshold };
  }
}

module.exports = SynapticPruning;
