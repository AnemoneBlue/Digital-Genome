/**
 * 👁️ Perception Integration System
 * Combining all senses into coherent experience
 */

class PerceptionIntegrationSystem {
  constructor() {
    this.senses = ['visual', 'auditory', 'tactile', 'olfactory', 'gustatory', 'proprioceptive', 'vestibular'];
    this.integrations = new Map();
    this.currentPerception = null;
  }

  // Integrate multimodal perception
  integrate(perceptions) {
    const integrated = {
      timestamp: Date.now(),
      modalities: Object.keys(perceptions),
      unified: this.unify(perceptions),
      consistency: this.checkConsistency(perceptions),
      dominant: this.getDominant(perceptions),
      binding: this.bindFeatures(perceptions)
    };

    this.currentPerception = integrated;
    return integrated;
  }

  unify(perceptions) {
    let unified = {
      what: null,
      where: null,
      when: null,
      significance: 0
    };

    // Extract what
    if (perceptions.visual) unified.what = perceptions.visual.object;
    if (perceptions.auditory) unified.what = perceptions.auditory.sound;
    if (perceptions.tactile) unified.what = perceptions.tactile.texture;

    // Extract where (spatial)
    if (perceptions.visual) unified.where = perceptions.visual.location;
    if (perceptions.tactile) unified.where = 'body';

    // Extract when (temporal)
    unified.when = 'now';

    // Calculate significance
    if (perceptions.visual?.emotional) unified.significance += 0.4;
    if (perceptions.auditory?.novel) unified.significance += 0.3;
    if (perceptions.tactile?.dangerous) unified.significance += 0.5;

    return unified;
  }

  checkConsistency(perceptions) {
    let consistent = true;
    const conflicts = [];

    // Check for cross-modal conflicts
    if (perceptions.visual && perceptions.auditory) {
      if (perceptions.visual.object && perceptions.auditory.sound) {
        // Simple check - in reality would be much more complex
        consistent = true;
      }
    }

    return { consistent, conflicts };
  }

  getDominant(perceptions) {
    const priorities = {
      visual: 0.9,
      auditory: 0.8,
      tactile: 0.7,
      olfactory: 0.6,
      gustatory: 0.5
    };

    let dominant = null;
    let maxPriority = 0;

    for (const [sense, data] of Object.entries(perceptions)) {
      if (priorities[sense] > maxPriority) {
        maxPriority = priorities[sense];
        dominant = sense;
      }
    }

    return dominant;
  }

  bindFeatures(perceptions) {
    const bindings = [];

    // Bind visual object with sound
    if (perceptions.visual?.object && perceptions.auditory?.sound) {
      bindings.push({
        features: ['visual', 'auditory'],
        bound: true,
        confidence: 0.8
      });
    }

    // Bind tactile with proprioception
    if (perceptions.tactile && perceptions.proprioceptive) {
      bindings.push({
        features: ['tactile', 'proprioceptive'],
        bound: true,
        confidence: 0.95
      });
    }

    return bindings;
  }

  // Bottom-up processing
  bottomUp(stimulus) {
    return {
      type: 'bottom-up',
      processing: 'data-driven',
      features: this.extractFeatures(stimulus),
      route: 'thalamus to cortex',
      speed: 'fast'
    };
  }

  // Top-down processing
  topDown(expectation) {
    return {
      type: 'top-down',
      processing: 'expectation-driven',
      features: expectation,
      route: 'prefrontal to sensory cortex',
      speed: 'slower'
    };
  }

  // Perceptual inference
  infer(perception) {
    const inferences = [];

    // Make inferences based on available data
    if (perception.visual?.shape === 'round' && perception.tactile?.texture === 'smooth') {
      inferences.push({ content: 'Probably a ball', confidence: 0.7 });
    }

    if (perception.auditory?.sound === 'bark') {
      inferences.push({ content: 'Dog nearby', confidence: 0.8 });
    }

    return inferences;
  }

  // Change blindness
  detectChange(scene1, scene2) {
    const changes = [];
    
    // Simulate change detection
    if (Math.random() > 0.5) {
      changes.push('object moved');
    }

    return {
      detected: changes.length > 0,
      changes,
      latency: Math.random() * 500 + 100 // ms
    };
  }

  // Attention and perception
  attendTo(target, attentionType = 'overt') {
    return {
      target,
      attentionType,
      processing: 'enhanced',
      gating: 'selective',
      priority: Math.random() * 0.5 + 0.5
    };
  }

  getCurrentPerception() {
    return this.currentPerception;
  }
}

module.exports = new PerceptionIntegrationSystem();
