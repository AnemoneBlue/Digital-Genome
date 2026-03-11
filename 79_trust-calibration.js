/**
 * Genome Digital - Trust Calibration
 * Establish and maintain trust
 * Added: 11 Mar 2026
 */

class TrustCalibration {
  constructor() {
    this.trustLevel = 0.5;
    this.reliability = 0.7;
    this.verifiedActions = [];
  }

  assessTrust(entity) {
    return {
      entity,
      trustLevel: this.trustLevel,
      reliability: this.reliability,
      verified: this.verifiedActions.length
    };
  }

  increaseTrust(action, positive = true) {
    const change = positive ? 0.1 : -0.1;
    this.trustLevel = Math.max(0, Math.min(1, this.trustLevel + change));
    
    this.verifiedActions.push({ action, positive, timestamp: Date.now() });
    return { trustLevel: this.trustLevel, changed: true };
  }

  calibrate(reliabilityScore) {
    this.reliability = reliabilityScore;
    this.trustLevel *= reliabilityScore;
    return { trustLevel: this.trustLevel, reliability: this.reliability };
  }

  getTrustHistory() {
    return this.verifiedActions.slice(-10);
  }
}

module.exports = TrustCalibration;
