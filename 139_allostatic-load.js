/**
 * Genome Digital - Allostatic Load
 * Stress accumulation - the cost of adaptation
 * Added: 11 Mar 2026
 */

class AllostaticLoad {
  constructor() {
    this.load = 0;
    this.maxLoad = 100;
    this.systems = ['cardiovascular', 'metabolic', 'immune', 'neuroendocrine'];
  }

  accumulate(stress) {
    this.load = Math.min(this.maxLoad, this.load + stress);
    
    return {
      load: this.load,
      percentFull: (this.load / this.maxLoad) * 100,
      overloaded: this.load > 80
    };
  }

  recover(amount) {
    this.load = Math.max(0, this.load - amount);
    return { load: this.load, recovered: amount };
  }
}

module.exports = AllostaticLoad;
