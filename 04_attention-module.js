/**
 * Genome Digital - Attention Module
 * Focus, multitasking, and attention control
 * Added: 9 Mar 2026
 */

class AttentionModule {
  constructor() {
    this.focus = 1.0;
    this.attentionalSpotlight = 0.8;
    this.filterThreshold = 0.5;
  }

  // Focus attention
  focusOn(target, intensity = 1.0) {
    this.focus = intensity;
    return { target, focus: this.focus };
  }

  // Divided attention
  multitask(tasks) {
    const focusPerTask = this.focus / tasks.length;
    return tasks.map(t => ({ task: t, focus: focusPerTask }));
  }

  // Filter out distractions
  filter(input) {
    const importance = Math.random();
    return {
      input,
      passed: importance > this.filterThreshold,
      importance
    };
  }

  // Shift attention
  shift(from, to) {
    return {
      from,
      to,
      cost: Math.random() * 0.2
    };
  }
}

module.exports = AttentionModule;
