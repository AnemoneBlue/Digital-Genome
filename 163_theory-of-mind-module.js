/**
 * Genome Digital - Theory of Mind Module
 * Understanding other minds - beliefs, desires, intentions
 * Added: 11 Mar 2026
 */

class TheoryOfMindModule {
  constructor() {
    this.models = new Map();
    this.predictions = [];
    this.empathy = 0.7;
  }

  createModel(entity) {
    const model = {
      entity,
      beliefs: new Map(),
      desires: new Map(),
      intentions: new Map(),
      emotions: new Map(),
      created: Date.now()
    };
    
    this.models.set(entity, model);
    return model;
  }

  updateBelief(entity, belief, value) {
    const model = this.models.get(entity);
    if (model) {
      model.beliefs.set(belief, value);
    }
    return model;
  }

  updateDesire(entity, desire, intensity) {
    const model = this.models.get(entity);
    if (model) {
      model.desires.set(desire, intensity);
    }
    return model;
  }

  inferIntention(entity, action) {
    const model = this.models.get(entity);
    if (!model) return null;
    
    const intention = {
      entity,
      action,
      inferred: true,
      basedOn: Array.from(model.desires.values())[0] || 'unknown'
    };
    
    this.predictions.push(intention);
    return intention;
  }

  predictBehavior(entity) {
    const model = this.models.get(entity);
    if (!model) return null;
    
    const desire = Array.from(model.desires.values())[0];
    const intention = Array.from(model.intentions.values())[0];
    
    return {
      entity,
      likelyBehavior: desire || intention || 'neutral',
      confidence: Math.random() * 0.3 + 0.7
    };
  }

  empathize(entity) {
    const model = this.models.get(entity);
    if (!model) return { empathy: 0 };
    
    const emotions = Array.from(model.emotions.values());
    return {
      entity,
      empathyLevel: this.empathy,
      perceivedEmotions: emotions
    };
  }
}

module.exports = TheoryOfMindModule;
