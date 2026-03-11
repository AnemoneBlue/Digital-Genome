/**
 * Genome Digital - Salience Network
 * Attention and important stimuli
 * Added: 11 Mar 2026
 */

class SalienceNetwork {
  constructor() {
    this.salientItems = [];
  }

  detectSalience(stimulus) {
    const salience = Math.random();
    if (salience > 0.7) {
      this.salientItems.push(stimulus);
    }
    return { stimulus, salience, important: salience > 0.7 };
  }

  focus() {
    return { focused: this.salientItems[this.salientItems.length - 1] };
  }
}

module.exports = SalienceNetwork;
