/**
 * Genome Digital - Reward System
 * Motivation and reinforcement
 * Added: 11 Mar 2026
 */

class RewardSystem {
  constructor() {
    this.rewards = [];
    this.punishments = [];
    this.motivationLevel = 0.7;
  }

  deliverReward(reward, value = 1.0) {
    const rewardObj = {
      reward,
      value,
      delivered: Date.now(),
      effect: 'positive'
    };
    this.rewards.push(rewardObj);
    this.motivationLevel = Math.min(1, this.motivationLevel + value * 0.1);
    return rewardObj;
  }

  deliverPunishment(punishment, value = 0.5) {
    const punishmentObj = {
      punishment,
      value,
      delivered: Date.now(),
      effect: 'negative'
    };
    this.punishments.push(punishmentObj);
    this.motivationLevel = Math.max(0, this.motivationLevel - value * 0.1);
    return punishmentObj;
  }

  calculateMotivation() {
    return {
      level: this.motivationLevel,
      rewardsReceived: this.rewards.length,
      punishmentsReceived: this.punishments.length
    };
  }

  reinforceBehavior(behavior, positive = true) {
    return positive 
      ? this.deliverReward(behavior)
      : this.deliverPunishment(behavior);
  }
}

module.exports = RewardSystem;
