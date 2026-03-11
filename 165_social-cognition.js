/**
 * Genome Digital - Social Cognition
 * Understanding social situations and norms
 * Added: 11 Mar 2026
 */

class SocialCognition {
  constructor() {
    this.norms = new Map();
    this.roles = new Map();
    this.relationships = [];
  }

  learnNorm(norm, context) {
    this.norms.set(norm, {
      norm,
      context,
      strength: 0.5,
      learned: Date.now()
    });
    return { learned: norm };
  }

  applyNorm(situation) {
    const applicable = [];
    
    for (const [norm, data] of this.norms) {
      if (situation.includes(data.context)) {
        applicable.push(norm);
      }
    }
    
    return {
      situation,
      applicableNorms: applicable,
      selected: applicable[0] || null
    };
  }

  recognizeRole(entity) {
    const roles = ['leader', 'follower', 'expert', 'novice', 'mediator'];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    this.roles.set(entity, role);
    return { entity, role };
  }

  navigateSocial(situation) {
    const roles = Array.from(this.roles.values());
    const norms = Array.from(this.norms.keys()).slice(0, 3);
    
    return {
      situation,
      expectedRoles: roles,
      relevantNorms: norms,
      navigate: true
    };
  }

  buildRelationship(entity, type) {
    const relationship = {
      entity,
      type,
      strength: 0.5,
      established: Date.now()
    };
    
    this.relationships.push(relationship);
    return relationship;
  }

  understandGroupDynamics(group) {
    return {
      group,
      size: group.length || 3,
      roles: Array.from(this.roles.values()).slice(0, 3),
      norms: Array.from(this.norms.keys()).slice(0, 3)
    };
  }
}

module.exports = SocialCognition;
