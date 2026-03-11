/**
 * Genome Digital - Myelination
 * Speed up neural signals - insulation matters
 * Added: 11 Mar 2026
 */

class Myelination {
  constructor() {
    this.speed = 1.0;
    this.myelinThickness = 0;
    this.myelinatedAxons = [];
  }

  myelinate(axon) {
    this.myelinThickness += 0.1;
    this.myelinatedAxons.push(axon);
    this.speed *= 1.1;
    
    return {
      axon,
      myelinated: true,
      speed: this.speed,
      thickness: this.myelinThickness
    };
  }

  getConductionVelocity() {
    return this.speed * 10;
  }
}

module.exports = Myelination;
