/**
 * Genome Digital - Receptor Binding
 * Signal detection - lock and key mechanism
 * Added: 11 Mar 2026
 */

class ReceptorBinding {
  constructor() {
    this.bindings = [];
    this.receptors = new Map();
  }

  bind(receptor, ligand) {
    const affinity = Math.random();
    const bound = affinity > 0.3;
    
    const binding = {
      receptor,
      ligand,
      bound,
      affinity,
      timestamp: Date.now()
    };
    
    if (bound) {
      this.bindings.push(binding);
      this.receptors.set(receptor, { bound: true, ligand });
    }
    
    return binding;
  }

  unbind(receptor) {
    this.receptors.set(receptor, { bound: false, ligand: null });
    return { receptor, unbound: true };
  }
}

module.exports = ReceptorBinding;
