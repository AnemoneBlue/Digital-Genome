/**
 * Genome Digital - Ion Channel Dynamics
 * Neural electrical signals - sodium, potassium, calcium
 * Added: 11 Mar 2026
 */

class IonChannelDynamics {
  constructor() {
    this.channels = { na: { open: false, conductance: 120 }, 
                      k: { open: false, conductance: 36 }, 
                      ca: { open: false, conductance: 1 } };
    this.membranePotential = -70;
  }

  open(channel) {
    if (this.channels[channel]) {
      this.channels[channel].open = true;
    }
    return { channel, open: true, potential: this.membranePotential };
  }

  close(channel) {
    if (this.channels[channel]) {
      this.channels[channel].open = false;
    }
    return { channel, open: false };
  }

  updatePotential() {
    let current = 0;
    for (const [name, channel] of Object.entries(this.channels)) {
      if (channel.open) {
        current += channel.conductance * (this.membranePotential - this.getReversalPotential(name));
      }
    }
    
    this.membranePotential += current * 0.1;
    return this.membranePotential;
  }

  getReversalPotential(channel) {
    const potentials = { na: 60, k: -77, ca: 120 };
    return potentials[channel] || 0;
  }
}

module.exports = IonChannelDynamics;
