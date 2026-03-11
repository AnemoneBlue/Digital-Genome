/**
 * Genome Digital - Action Potential
 * Neural firing mechanism - all-or-none electrical pulse
 * Added: 11 Mar 2026
 */

class ActionPotential {
  constructor() {
    this.threshold = -55;
    this.restingPotential = -70;
    this.peak = 30;
    this.currentPotential = this.restingPotential;
    this.firing = false;
    this.firingHistory = [];
  }

  fire(membranePotential) {
    const fires = membranePotential > this.threshold;
    
    if (fires && !this.firing) {
      this.firing = true;
      this.currentPotential = this.peak;
      
      const spike = {
        fired: true,
        peak: this.peak,
        timestamp: Date.now()
      };
      
      this.firingHistory.push(spike);
      
      setTimeout(() => {
        this.currentPotential = -90;
        setTimeout(() => {
          this.currentPotential = this.restingPotential;
          this.firing = false;
        }, 1);
      }, 1);
    }
    
    return { fires, potential: membranePotential, firing: this.firing };
  }

  getState() {
    return {
      potential: this.currentPotential,
      threshold: this.threshold,
      firing: this.firing
    };
  }
}

module.exports = ActionPotential;
