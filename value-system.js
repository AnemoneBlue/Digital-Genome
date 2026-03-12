/**
 * Genome Digital - Value System Module
 * Manages values and moral reasoning
 * Added: 12 Mar 2026
 */

class ValueSystem {
  constructor() {
    this.values = {};
    this.hierarchy = [];
    this.conflicts = [];
  }

  // Define value
  define(name, importance, description = '') {
    this.values[name] = {
      name,
      importance,
      description,
      conflictsWith: [],
      createdAt: Date.now()
    };

    return { valueDefined: name };
  }

  // Set hierarchy
  setHierarchy(orderedValues) {
    this.hierarchy = orderedValues;
    return { hierarchySet: true };
  }

  // Resolve value conflict
  resolveConflict(value1, value2) {
    const importance1 = this.values[value1]?.importance || 0;
    const importance2 = this.values[value2]?.importance || 0;

    const winner = importance1 > importance2 ? value1 : value2;

    this.conflicts.push({
      value1,
      value2,
      resolution: winner,
      timestamp: Date.now()
    });

    return { resolved: true, winner };
  }

  // Evaluate action
  evaluate(action) {
    const scores = {};
    
    Object.keys(this.values).forEach(value => {
      scores[value] = Math.random(); // Simplified
    });

    return {
      action,
      scores,
      bestValue: Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
    };
  }

  // Get values
  getValues() {
    return this.values;
  }

  getStatus() {
    return {
      values: Object.keys(this.values).length,
      hierarchy: this.hierarchy.length,
      conflicts: this.conflicts.length
    };
  }
}

module.exports = ValueSystem;
