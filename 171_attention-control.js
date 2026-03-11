/**
 * Genome Digital - Attention Control
 * Selective focus and attention management
 * Added: 11 Mar 2026
 */

class AttentionControl {
  constructor() {
    this.focus = null;
    this.distractions = [];
    this.attentionalResources = 100;
  }

  focus(target, intensity = 0.9) {
    const previous = this.focus;
    this.focus = {
      target,
      intensity,
      started: Date.now()
    };
    this.attentionalResources *= intensity;
    
    return {
      previous,
      current: target,
      intensity,
      resources: this.attentionalResources
    };
  }

  filter(distraction) {
    const filtered = {
      distraction,
      blocked: true,
      timestamp: Date.now()
    };
    this.distractions.push(filtered);
    return filtered;
  }

  shift(newTarget) {
    const old = this.focus;
    this.focus = {
      target: newTarget,
      intensity: 0.7,
      started: Date.now()
    };
    return { from: old?.target, to: newTarget };
  }

  dividedAttention(tasks) {
    return {
      tasks: tasks.length,
      attentionPerTask: this.attentionalResources / tasks.length,
      possible: tasks.length <= 4
    };
  }

  getResources() {
    return {
      current: this.attentionalResources,
      focus: this.focus,
      distractionsBlocked: this.distractions.length
    };
  }
}

module.exports = AttentionControl;
