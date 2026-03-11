/**
 * Genome Digital - Value Hierarchy
 * Organizing what's important
 * Added: 11 Mar 2026
 */

class ValueHierarchy {
  constructor() {
    this.values = new Map();
    this.hierarchy = [];
  }

  addValue(name, importance, category = 'personal') {
    const value = {
      name,
      importance,
      category,
      added: Date.now(),
      conflicts: [],
      aligns: []
    };
    
    this.values.set(name, value);
    this.updateHierarchy();
    return value;
  }

  updateHierarchy() {
    this.hierarchy = Array.from(this.values.values())
      .sort((a, b) => b.importance - a.importance);
  }

  resolveConflict(valueA, valueB) {
    const vA = this.values.get(valueA);
    const vB = this.values.get(valueB);
    
    if (!vA || !vB) return { error: 'Value not found' };
    
    const winner = vA.importance > vB.importance ? valueA : valueB;
    const loser = winner === valueA ? valueB : valueA;
    
    vA.conflicts.push(loser);
    vB.conflicts.push(winner);
    
    return { winner, loser };
  }

  prioritize() {
    return this.hierarchy.map((v, i) => ({
      rank: i + 1,
      value: v.name,
      importance: v.importance
    }));
  }

  alignAction(action) {
    let alignment = 0;
    let matched = 0;
    
    for (const value of this.values.values()) {
      if (action.includes(value.name)) {
        alignment += value.importance;
        matched++;
      }
    }
    
    return {
      action,
      alignment: matched > 0 ? alignment / matched : 0.5,
      matched: matched
    };
  }
}

module.exports = ValueHierarchy;
