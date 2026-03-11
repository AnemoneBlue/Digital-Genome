/**
 * Genome Digital - Attention Module
 * Focus, filtering, and cognitive resources
 * Added: 11 Mar 2026
 */

class AttentionModule {
  constructor() {
    this.focusLevel = 0.8;
    this.attentionalResources = 100;
    this.currentFocus = null;
    this.distractions = [];
  }

  focusOn(target, intensity = 0.9) {
    this.currentFocus = target;
    this.focusLevel = intensity;
    this.attentionalResources *= intensity;
    return { focused: target, intensity };
  }

  filter(distraction) {
    this.distractions.push({ distraction, blocked: true, time: Date.now() });
    return { filtered: true };
  }

  shiftAttention(newTarget) {
    const oldTarget = this.currentFocus;
    this.currentFocus = newTarget;
    return { from: oldTarget, to: newTarget };
  }

  getResources() {
    return {
      level: this.focusLevel,
      resources: this.attentionalResources,
      focus: this.currentFocus
    };
  }
}

module.exports = AttentionModule;
