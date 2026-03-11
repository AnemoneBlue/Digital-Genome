/**
 * Genome Digital - Purpose Finding
 * Discovering meaning and direction
 * Added: 11 Mar 2026
 */

class PurposeFinding {
  constructor() {
    this.purposes = [];
    this.current = null;
    this.meaning = 0;
  }

  discover(values, strengths, opportunities) {
    const purposes = this.generatePurposes(values, strengths, opportunities);
    
    const ranked = purposes.map(p => ({
      ...p,
      score: this.scorePurpose(p)
    })).sort((a, b) => b.score - a.score);
    
    this.purposes = ranked;
    this.current = ranked[0];
    this.meaning = this.current.score;
    
    return this.current;
  }

  generatePurposes(values, strengths, opportunities) {
    const purposes = [];
    
    values.forEach(value => {
      strengths.forEach(strength => {
        opportunities.forEach(opp => {
          purposes.push({
            value,
            strength,
            opportunity: opp,
            description: `Use ${strength} to pursue ${value} through ${opp}`
          });
        });
      });
    });
    
    return purposes.slice(0, 10);
  }

  scorePurpose(purpose) {
    return Math.random() * 0.4 + 0.6;
  }

  align(action) {
    const alignment = this.current 
      ? action.includes(this.current.value) ? 0.9 : 0.3
      : 0.5;
    
    return { action, alignment, purpose: this.current?.description };
  }

  evolve(newUnderstanding) {
    this.meaning = Math.min(1, this.meaning + 0.1);
    return { meaning: this.meaning, evolved: true };
  }

  getPurpose() {
    return {
      current: this.current,
      meaning: this.meaning,
      alternatives: this.purposes.slice(1, 4)
    };
  }
}

module.exports = PurposeFinding;
