/**
 * Genome Digital - Perception Module
 */

class Perception {
  perceive(data) {
    return { perceived: true, data };
  }
  getStatus() { return { active: true }; }
}

module.exports = Perception;
