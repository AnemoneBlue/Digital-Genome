/**
 * Genome Digital - Emotional Regulation
 * Manage and modulate emotions
 * Added: 11 Mar 2026
 */

class EmotionalRegulation {
  constructor() {
    this.currentEmotion = 'neutral';
    this.intensity = 0.3;
    this.strategies = ['reappraisal', 'acceptance', 'distraction', 'expression'];
  }

  setEmotion(emotion, intensity = 0.5) {
    this.currentEmotion = emotion;
    this.intensity = Math.min(1, intensity);
    return { emotion, intensity };
  }

  regulate(strategy) {
    if (!this.strategies.includes(strategy)) {
      return { error: 'Strategy not found' };
    }
    
    const regulation = {
      strategy,
      effect: 'emotional balance restored',
      newIntensity: this.intensity * 0.8
    };
    this.intensity = regulation.newIntensity;
    return regulation;
  }

  calmDown() {
    this.intensity *= 0.5;
    if (this.intensity < 0.2) this.currentEmotion = 'neutral';
    return { emotion: this.currentEmotion, intensity: this.intensity };
  }

  getState() {
    return { emotion: this.currentEmotion, intensity: this.intensity };
  }
}

module.exports = EmotionalRegulation;
