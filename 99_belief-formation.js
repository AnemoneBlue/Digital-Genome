/**
 * Genome Digital - Belief Formation
 * Building and updating beliefs
 * Added: 11 Mar 2026
 */

class BeliefFormation {
  constructor() {
    this.beliefs = new Map();
  }

  formBelief(proposition, strength = 0.5) {
    this.beliefs.set(proposition, {
      proposition,
      strength,
      formed: Date.now()
    });
    return { belief: proposition, strength };
  }

  updateBelief(proposition, newEvidence) {
    const belief = this.beliefs.get(proposition);
    if (belief) {
      belief.strength = (belief.strength + newEvidence) / 2;
      belief.updated = Date.now();
    }
    return belief;
  }

  getBeliefs() {
    return Array.from(this.beliefs.entries()).map(([k, v]) => ({ ...v, proposition: k }));
  }
}

module.exports = BeliefFormation;
