/**
 * Genome Digital - Intuitive Decision Making
 * Fast, unconscious decision processes
 * Added: 11 Mar 2026
 */

class IntuitiveDecisionMaking {
  constructor() {
    this.intuitions = [];
    this.patterns = new Map();
    this.gutFeelings = [];
  }

  sense(situation) {
    const intuition = {
      id: Date.now(),
      situation,
      feeling: this.generateGutFeeling(situation),
      confidence: Math.random() * 0.4 + 0.6,
      timestamp: Date.now()
    };
    
    this.intuitions.push(intuition);
    this.gutFeelings.push(intuition);
    
    return intuition;
  }

  generateGutFeeling(situation) {
    const feelings = [
      'right', 'wrong', 'uncertain', 'confident',
      'hesitant', 'drawn', 'repelled', 'curious'
    ];
    
    return feelings[Math.floor(Math.random() * feelings.length)];
  }

  trustIntuition(situation) {
    const relevant = this.intuitions
      .filter(i => this.related(i.situation, situation))
      .sort((a, b) => b.confidence - a.confidence);
    
    if (relevant.length === 0) {
      return this.sense(situation);
    }
    
    const consensus = relevant.slice(0, 3);
    const avgConfidence = consensus.reduce((s, i) => s + i.confidence, 0) / 3;
    
    return {
      basedOn: consensus.length + ' past experiences',
      feeling: consensus[0].feeling,
      confidence: avgConfidence
    };
  }

  related(situationA, situationB) {
    const a = JSON.stringify(situationA);
    const b = JSON.stringify(situationB);
    return a.includes(b) || b.includes(a);
  }

  calibrate() {
    const recent = this.intuitions.slice(-20);
    let correct = 0;
    
    recent.forEach(i => {
      if (Math.random() > 0.5) correct++;
    });
    
    const accuracy = correct / recent.length;
    
    return {
      accuracy,
      calibrated: accuracy > 0.6,
      suggestions: accuracy < 0.6 
        ? ['Gather more data', 'Slow down'] 
        : ['Trust your gut']
    };
  }

  developPattern(situation, outcome) {
    const key = JSON.stringify(situation);
    if (!this.patterns.has(key)) {
      this.patterns.set(key, { outcomes: [], count: 0 });
    }
    
    const pattern = this.patterns.get(key);
    pattern.outcomes.push(outcome);
    pattern.count++;
    pattern.success = pattern.outcomes.filter(o => o).length / pattern.outcomes.length;
    
    return pattern;
  }
}

module.exports = IntuitiveDecisionMaking;
