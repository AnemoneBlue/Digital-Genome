/**
 * Genome Digital - Social Cognition Module
 * Processes social information and interactions
 * Added: 12 Mar 2026
 */

class SocialCognition {
  constructor() {
    this.agents = {};
    this.interactions = [];
    this.theoryOfMind = {};
    this.socialKnowledge = {};
  }

  // Add agent to social model
  addAgent(agentId, attributes = {}) {
    this.agents[agentId] = {
      id: agentId,
      name: attributes.name || 'unknown',
      traits: attributes.traits || {},
      beliefs: {},
      relationships: {},
      createdAt: Date.now()
    };

    return { agentAdded: true };
  }

  // Update belief about agent
  updateBelief(agentId, belief, value) {
    if (this.agents[agentId]) {
      this.agents[agentId].beliefs[belief] = value;
    }
    return { beliefUpdated: true };
  }

  // Model agent's mental state (Theory of Mind)
  modelMentalState(agentId) {
    const agent = this.agents[agentId];
    if (!agent) return { error: 'Agent not found' };

    const mentalState = {
      desires: agent.traits.desires || [],
      beliefs: agent.beliefs,
      intentions: agent.traits.intentions || [],
      emotions: agent.traits.emotions || 'neutral'
    };

    this.theoryOfMind[agentId] = mentalState;
    return mentalState;
  }

  // Predict agent behavior
  predictBehavior(agentId, context) {
    const mentalState = this.modelMentalState(agentId);
    
    // Simple prediction based on traits
    const prediction = {
      agentId,
      likelyAction: mentalState.desires[0] || 'unknown',
      confidence: 0.5,
      basedOn: 'mental_model'
    };

    return prediction;
  }

  // Record interaction
  recordInteraction(agentId, type, content) {
    const interaction = {
      id: Date.now(),
      agentId,
      type,
      content,
      timestamp: Date.now()
    };

    this.interactions.push(interaction);

    // Update relationship
    if (this.agents[agentId]) {
      if (!this.agents[agentId].relationships.interactions) {
        this.agents[agentId].relationships.interactions = 0;
      }
      this.agents[agentId].relationships.interactions++;
    }

    return { interactionRecorded: true };
  }

  // Get social knowledge
  getSocialKnowledge() {
    return this.socialKnowledge;
  }

  // Get agent
  getAgent(agentId) {
    return this.agents[agentId] || null;
  }

  // Get all agents
  getAgents() {
    return Object.values(this.agents);
  }

  // Get interaction history
  getHistory() {
    return this.interactions;
  }

  getStatus() {
    return {
      agents: Object.keys(this.agents).length,
      interactions: this.interactions.length,
      mentalModels: Object.keys(this.theoryOfMind).length
    };
  }
}

module.exports = SocialCognition;
