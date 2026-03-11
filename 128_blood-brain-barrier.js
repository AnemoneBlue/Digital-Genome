/**
 * Genome Digital - Blood Brain Barrier
 * Neural protection - selective permeability
 * Added: 11 Mar 2026
 */

class BloodBrainBarrier {
  constructor() {
    this.permeable = false;
    this.transported = [];
  }

  allow(molecule) {
    const sizeLimit = 400;
    const allowed = molecule.size < sizeLimit && molecule.lipophilic;
    
    const transport = {
      molecule: molecule.name || 'unknown',
      allowed,
      size: molecule.size,
      lipophilic: molecule.lipophilic,
      timestamp: Date.now()
    };
    
    if (allowed) {
      this.transported.push(transport);
    }
    
    return { molecule: molecule.name, allowed };
  }

  pump(glucose) {
    return { pumped: true, glucose, method: 'GLUT1' };
  }
}

module.exports = BloodBrainBarrier;
