/**
 * Genome Digital - Decision Module
 */

class Decision {
  decide(options) {
    const choice = options[Math.floor(Math.random() * options.length)];
    return { decision: choice };
  }
  getStatus() { return { ready: true }; }
}

module.exports = Decision;
