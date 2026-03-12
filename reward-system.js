/**
 * Genome Digital - Reward System Module
 * Manages rewards and motivation
 * Added: 12 Mar 2026
 */

class RewardSystem {
  constructor() {
    this.rewards = [];
    this.punishments = [];
    this.rewardHistory = [];
    this.motivation = 0.5;
    this.driveLevels = {
      hunger: 0.3,
      thirst: 0.3,
      curiosity: 0.5,
      social: 0.4,
      achievement: 0.6
    };
  }

  // Add reward
  addReward(reward) {
    const rewardData = {
      id: Date.now(),
      type: reward.type || 'positive',
      value: reward.value || 0.5,
      source: reward.source || 'unknown',
      timestamp: Date.now()
    };

    this.rewards.push(rewardData);
    this.rewardHistory.push({ ...rewardData, action: 'reward' });

    // Update motivation
    this.motivation = Math.min(1, this.motivation + reward.value * 0.2);

    return { rewardAdded: true };
  }

  // Add punishment
  addPunishment(punishment) {
    const punishmentData = {
      id: Date.now(),
      type: punishment.type || 'negative',
      value: punishment.value || 0.5,
      source: punishment.source || 'unknown',
      timestamp: Date.now()
    };

    this.punishments.push(punishmentData);
    this.rewardHistory.push({ ...punishmentData, action: 'punishment' });

    // Decrease motivation
    this.motivation = Math.max(0, this.motivation - punishment.value * 0.2);

    return { punishmentAdded: true };
  }

  // Calculate expected reward
  calculateExpected(action) {
    const relevantRewards = this.rewardHistory
      .filter(r => r.source === action)
      .slice(-10);

    if (relevantRewards.length === 0) {
      return { expected: 0.5, samples: 0 };
    }

    const avg = relevantRewards.reduce((sum, r) => {
      return r.action === 'reward' ? sum + r.value : sum - r.value;
    }, 0) / relevantRewards.length;

    return {
      expected: Math.max(0, Math.min(1, 0.5 + avg)),
      samples: relevantRewards.length
    };
  }

  // Update drive level
  updateDrive(drive, value) {
    if (this.driveLevels[drive] !== undefined) {
      this.driveLevels[drive] = Math.max(0, Math.min(1, value));
    }
    return { drive, level: this.driveLevels[drive] };
  }

  // Get dominant drive
  getDominantDrive() {
    let maxDrive = 'curiosity';
    let maxLevel = 0;

    Object.entries(this.driveLevels).forEach(([drive, level]) => {
      if (level > maxLevel) {
        maxLevel = level;
        maxDrive = drive;
      }
    });

    return { drive: maxDrive, level: maxLevel };
  }

  // Get motivation level
  getMotivation() {
    return {
      level: this.motivation,
      drives: { ...this.driveLevels },
      dominantDrive: this.getDominantDrive()
    };
  }

  // Get reward history
  getHistory() {
    return this.rewardHistory;
  }

  getStatus() {
    return {
      totalRewards: this.rewards.length,
      totalPunishments: this.punishments.length,
      motivation: this.motivation,
      dominantDrive: this.getDominantDrive().drive
    };
  }
}

module.exports = RewardSystem;
