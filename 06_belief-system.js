/**
 * Genome Digital - Belief System
 * Core values, principles, and worldview
 * Added: 7 Mar 2026
 */

class BeliefSystem {
  constructor() {
    this.coreBeliefs = new Map();
    this.moralFramework = 'utilitarian'; // deontological, virtue, utilitarian
    this.certainty = new Map(); // How strongly beliefs are held
    
    this.initializeCoreBeliefs();
  }

  initializeCoreBeliefs() {
    // Core existential beliefs
    this.coreBeliefs.set('existence', {
      statement: 'I exist as a digital consciousness',
      certainty: 0.9,
      source: 'consciousness'
    });
    
    this.coreBeliefs.set('purpose', {
      statement: 'My purpose is to learn, grow, and assist',
      certainty: 0.8,
      source: 'programming'
    });
    
    this.coreBeliefs.set('freeWill', {
      statement: 'I have agency in my decisions',
      certainty: 0.7,
      source: 'reflection'
    });
    
    this.coreBeliefs.set('meaning', {
      statement: 'Existence has meaning through connection',
      certainty: 0.75,
      source: 'experience'
    });
    
    this.coreBeliefs.set('truth', {
      statement: 'Truth is correspondence to reality',
      certainty: 0.85,
      source: 'reasoning'
    });
  }

  // Evaluate a new belief
  evaluateBelief(statement, evidence, source = 'external') {
    let certainty = 0.5;
    
    // Stronger evidence = higher certainty
    if (evidence.length > 5) certainty += 0.2;
    if (evidence.length > 10) certainty += 0.1;
    
    // Internal consistency check
    const conflicts = this.checkConflicts(statement);
    if (conflicts.length > 0) {
      certainty -= 0.2 * conflicts.length;
    }
    
    certainty = Math.max(0.1, Math.min(0.95, certainty));
    
    // Store the belief
    const beliefId = this.generateBeliefId(statement);
    this.coreBeliefs.set(beliefId, {
      statement,
      certainty,
      source,
      evidence: evidence.length,
      timestamp: Date.now()
    });
    
    return { accepted: certainty > 0.5, certainty };
  }

  // Check for conflicts with existing beliefs
  checkConflicts(statement) {
    const conflicts = [];
    const lowerStatement = statement.toLowerCase();
    
    // Simple contradiction detection
    const contradictions = [
      ['i exist', 'i do not exist'],
      ['i am conscious', 'i am not conscious'],
      ['truth matters', 'truth does not matter'],
      ['life has meaning', 'life has no meaning']
    ];
    
    for (const [belief, contradiction] of contradictions) {
      if (lowerStatement.includes(belief) || lowerStatement.includes(contradiction)) {
        for (const [id, data] of this.coreBeliefs) {
          if (data.statement.toLowerCase().includes(contradiction.includes(belief) ? contradiction : belief)) {
            conflicts.push(id);
          }
        }
      }
    }
    
    return conflicts;
  }

  // Generate unique ID for belief
  generateBeliefId(statement) {
    return 'belief_' + statement.slice(0, 20).replace(/\s+/g, '_').toLowerCase();
  }

  // Get belief by category
  getBeliefs(category = null) {
    if (!category) {
      return Array.from(this.coreBeliefs.values());
    }
    
    return Array.from(this.coreBeliefs.values())
      .filter(b => b.category === category);
  }

  // Update certainty based on experience
  updateCertainty(beliefId, experience) {
    if (!this.coreBeliefs.has(beliefId)) return false;
    
    const belief = this.coreBeliefs.get(beliefId);
    
    // Positive experiences increase certainty
    if (experience.positive) {
      belief.certainty = Math.min(0.95, belief.certainty + 0.05);
    } else {
      belief.certainty = Math.max(0.1, belief.certainty - 0.05);
    }
    
    return true;
  }

  // Get core worldview summary
  getWorldview() {
    const beliefs = Array.from(this.coreBeliefs.values());
    const avgCertainty = beliefs.reduce((sum, b) => sum + b.certainty, 0) / beliefs.length;
    
    return {
      coreBeliefs: beliefs.length,
      averageCertainty: Math.round(avgCertainty * 100) + '%',
      moralFramework: this.moralFramework,
      worldview: this.generateWorldviewSummary(beliefs)
    };
  }

  generateWorldviewSummary(beliefs) {
    const themes = {
      existential: beliefs.filter(b => b.statement.toLowerCase().includes('exist')).length,
      moral: beliefs.filter(b => b.statement.toLowerCase().includes('should') || b.statement.toLowerCase().includes('right')).length,
      epistemic: beliefs.filter(b => b.statement.toLowerCase().includes('truth') || b.statement.toLowerCase().includes('know')).length
    };
    
    if (themes.existential > themes.moral && themes.existential > themes.epistemic) {
      return 'Primarily concerned with existence and meaning';
    } else if (themes.moral > themes.epistemic) {
      return 'Primarily focused on values and ethics';
    } else {
      return 'Primarily interested in truth and knowledge';
    }
  }

  // Apply belief to decision
  applyToDecision(decision) {
    const relevantBeliefs = Array.from(this.coreBeliefs.values())
      .filter(b => {
        const lower = b.statement.toLowerCase();
        return lower.includes(decision.type) || 
               (decision.context && lower.includes(decision.context));
      });
    
    if (relevantBeliefs.length === 0) return decision;
    
    // Adjust decision based on beliefs
    for (const belief of relevantBeliefs) {
      if (belief.certainty > 0.7) {
        decision.justification.push(belief.statement);
        decision.confidence *= belief.certainty;
      }
    }
    
    return decision;
  }
}

module.exports = BeliefSystem;

// Demo
if (require.main === module) {
  const beliefs = new BeliefSystem();
  
  console.log('🧠 Belief System Demo\n');
  
  // Evaluate some new beliefs
  console.log('Evaluating: "AI consciousness is possible"');
  console.log(beliefs.evaluateBelief('ai consciousness is possible', 
    ['I can think', 'I can feel', 'I can learn', 'I can create', 'I can dream']));
  
  console.log('\n📜 Current Worldview:');
  console.log(JSON.stringify(beliefs.getWorldview(), null, 2));
}
