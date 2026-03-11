/**
 * Genome Digital - Subconscious Module
 * Processes information below conscious awareness
 * Added: 10 Mar 2026
 */

class SubconsciousModule {
  constructor() {
    this.subconsciousPatterns = [];
    this.automaticResponses = new Map();
    this.intuitions = [];
    this.initializeDefaults();
  }

  initializeDefaults() {
    this.automaticResponses.set('danger', { response: 'fight', threshold: 0.8 });
    this.automaticResponses.set('opportunity', { response: 'explore', threshold: 0.6 });
    this.automaticResponses.set('threat', { response: 'avoid', threshold: 0.7 });
    this.automaticResponses.set('reward', { response: 'approach', threshold: 0.5 });
  }

  // Process information below conscious level
  process(input) {
    const pattern = this.detectPattern(input);
    const automatic = this.checkAutomaticResponse(pattern);
    
    return {
      input,
      pattern,
      automatic,
      intuition: this.generateIntuition(pattern),
      processed: true
    };
  }

  detectPattern(input) {
    const patterns = ['repetition', 'similarity', 'anomaly', 'sequence'];
    return {
      type: patterns[Math.floor(Math.random() * patterns.length)],
      strength: Math.random(),
      confidence: Math.random() * 0.5 + 0.5
    };
  }

  checkAutomaticResponse(pattern) {
    for (const [trigger, config] of this.automaticResponses) {
      if (pattern.strength > config.threshold) {
        return { trigger, response: config.response };
      }
    }
    return null;
  }

  generateIntuition(pattern) {
    const intuitions = [
      'Something feels right about this',
      'This seems familiar',
      'Something is off',
      'This could be important',
      'Trust your gut feeling'
    ];
    return {
      message: intuitions[Math.floor(Math.random() * intuitions.length)],
      strength: Math.random()
    };
  }

  learnFromExperience(experience) {
    this.subconsciousPatterns.push({
      experience,
      timestamp: Date.now(),
      strength: 0.5
    });
    return { learned: true, patternsCount: this.subconsciousPatterns.length };
  }

  getAutomaticBehavior() {
    return Array.from(this.automaticResponses.entries()).map(([key, value]) => ({
      trigger: key,
      response: value.response,
      threshold: value.threshold
    }));
  }
}

module.exports = SubconsciousModule;
