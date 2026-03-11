/**
 * Genome Digital - Value Representation
 * Assigning value to outcomes
 * Added: 11 Mar 2026
 */

class ValueRepresentation {
  constructor() {
    this.values = new Map();
  }

  assignValue(item, value) {
    this.values.set(item, value);
    return { item, value };
  }

  compare(itemA, itemB) {
    const valA = this.values.get(itemA) || 0;
    const valB = this.values.get(itemB) || 0;
    return { winner: valA > valB ? itemA : itemB, difference: Math.abs(valA - valB) };
  }

  updateValue(item, delta) {
    const current = this.values.get(item) || 0;
    this.values.set(item, current + delta);
    return { item, newValue: this.values.get(item) };
  }
}

module.exports = ValueRepresentation;
