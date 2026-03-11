/**
 * Genome Digital - Intentionality Module
 * Aboutness and directed mental states
 * Added: 11 Mar 2026
 */

class IntentionalityModule {
  constructor() {
    this.intentions = [];
    this.targets = new Map();
  }

  intend(target, content) {
    const intention = {
      target,
      content,
      directed: true,
      formed: Date.now()
    };
    this.intentions.push(intention);
    this.targets.set(target, intention);
    return intention;
  }

  about(mentalState, target) {
    return {
      mentalState,
      target,
      intentional: true,
      relation: 'aboutness'
    };
  }

  fulfill(intentionId) {
    const intention = this.intentions.find(i => i.target === intentionId);
    if (intention) {
      return { fulfilled: true, intention };
    }
    return { fulfilled: false };
  }

  abandon(target) {
    const intention = this.targets.get(target);
    if (intention) {
      return { abandoned: target };
    }
    return { notFound: true };
  }
}

module.exports = IntentionalityModule;
