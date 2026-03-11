/**
 * Genome Digital - Metacognition Module
 * Thinking about thinking - self-awareness of cognitive processes
 * Added: 11 Mar 2026
 */

class MetacognitionModule {
  constructor() {
    this.thoughtProcesses = [];
    this.cognitiveBiases = [];
    this.strategies = [];
    this.awareness = 0;
  }

  monitor(thought) {
    const monitoring = {
      thought,
      timestamp: Date.now(),
      type: this.classifyThought(thought),
      awareness: this.awareness,
      monitored: true
    };
    
    this.thoughtProcesses.push(monitoring);
    return monitoring;
  }

  classifyThought(thought) {
    const types = ['deliberative', 'intuitive', 'emotional', 'automatic'];
    return types[Math.floor(Math.random() * types.length)];
  }

  evaluateCognition() {
    return {
      thoughts: this.thoughtProcesses.length,
      awareness: this.awareness,
      biases: this.cognitiveBiases.length,
      status: this.awareness > 0.5 ? 'highly_aware' : 'developing'
    };
  }

  detectBias() {
    const biases = [
      'confirmation', 'availability', 'anchoring',
      'representativeness', 'overconfidence', ' hindsight'
    ];
    return biases[Math.floor(Math.random() * biases.length)];
  }

  correctBias(bias) {
    const correction = {
      bias,
      corrected: true,
      strategy: this.getCorrectionStrategy(bias)
    };
    this.cognitiveBiases.push(correction);
    return correction;
  }

  getCorrectionStrategy(bias) {
    const strategies = {
      confirmation: 'seek disconfirming evidence',
      availability: 'use base rates',
      anchoring: 'consider multiple anchors',
      representativeness: 'use statistics',
      overconfidence: 'calibrate predictions',
      hindsight: 'keep records of predictions'
    };
    return strategies[bias] || 'general debiasing';
  }

  improveAwareness(amount = 0.1) {
    this.awareness = Math.min(1, this.awareness + amount);
    return { awareness: this.awareness };
  }

  reflect() {
    return {
      thoughtCount: this.thoughtProcesses.length,
      biasCount: this.cognitiveBiases.length,
      awarenessLevel: this.awareness,
      recentThoughts: this.thoughtProcesses.slice(-5)
    };
  }
}

module.exports = MetacognitionModule;
