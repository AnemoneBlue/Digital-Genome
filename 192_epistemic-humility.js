/**
 * Genome Digital - Epistemic Humility
 * Knowing the limits of knowledge
 * Added: 11 Mar 2026
 */

class EpistemicHumility {
  constructor() {
    this.unknowns = [];
    this.certainty = 0.7;
  }

  recognizeUnknown() {
    const unknown = {
      question: 'unanswered',
      humility: true,
      acknowledged: true
    };
    this.unknowns.push(unknown);
    return unknown;
  }

  doubt(claim) {
    return {
      claim,
      certain: false,
      needsEvidence: true
    };
  }

  calibrateCertainty(evidence) {
    this.certainty = evidence ? Math.min(0.9, this.certainty + 0.1) : Math.max(0.3, this.certainty - 0.1);
    return { certainty: this.certainty };
  }

  admitIgnorance() {
    return { ignorance: 'admitted', wisdom: true };
  }
}

module.exports = EpistemicHumility;
