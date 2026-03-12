/**
 * Genome Digital - Creativity Module
 * Generates novel ideas and solutions
 * Added: 12 Mar 2026
 */

class CreativityModule {
  constructor() {
    this.ideas = [];
    this.insights = [];
    this.associations = {};
    this.creativityLevel = 0.5;
  }

  // Generate ideas
  generate(context) {
    const ideas = [];
    const count = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < count; i++) {
      const idea = {
        id: Date.now() + i,
        content: this.generateIdeaContent(context),
        novelty: Math.random(),
        usefulness: Math.random(),
        createdAt: Date.now()
      };

      ideas.push(idea);
      this.ideas.push(idea);

      // Make associations
      this.makeAssociation(context.topic || 'general', idea.content);
    }

    return { ideasGenerated: ideas.length, ideas };
  }

  // Generate idea content
  generateIdeaContent(context) {
    const templates = [
      `A new approach to ${context.topic || 'the problem'}`,
      `Combining ${context.element1 || 'technology'} with ${context.element2 || 'nature'}`,
      `Reimagining ${context.subject || 'the system'}`,
      `A novel solution involving ${context.component || 'multiple systems'}`,
      `An unconventional perspective on ${context.topic || 'existing ideas'}`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  // Make mental association
  makeAssociation(key, value) {
    if (!this.associations[key]) {
      this.associations[key] = [];
    }

    if (!this.associations[key].includes(value)) {
      this.associations[key].push(value);
    }

    return { associated: true };
  }

  // Get associations
  getAssociations(key) {
    return this.associations[key] || [];
  }

  // Combine concepts
  combine(concepts) {
    const combination = {
      id: Date.now(),
      inputs: concepts,
      output: concepts.join(' + '),
      novelty: Math.random() * 0.5 + 0.5,
      createdAt: Date.now()
    };

    this.ideas.push(combination);
    return combination;
  }

  // Divergent thinking
  diverge(problem) {
    const directions = [
      'How to solve differently?',
      'What if we change the goal?',
      'What resources are unused?',
      'How would a child solve this?',
      'What would nature do?'
    ];

    const questions = directions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return {
      problem,
      divergentQuestions: questions
    };
  }

  // Convergent thinking
  converge(ideas) {
    const evaluated = ideas.map(idea => ({
      ...idea,
      score: (idea.novelty || 0.5) * (idea.usefulness || 0.5)
    }));

    evaluated.sort((a, b) => b.score - a.score);

    return {
      best: evaluated[0],
      allRanked: evaluated
    };
  }

  // Have insight
  haveInsight(suddenUnderstanding) {
    const insight = {
      id: Date.now(),
      content: suddenUnderstanding,
      timestamp: Date.now(),
      type: 'aha_moment'
    };

    this.insights.push(insight);
    return { insight };
  }

  // Set creativity level
  setCreativityLevel(level) {
    this.creativityLevel = Math.max(0, Math.min(1, level));
    return { creativityLevel: this.creativityLevel };
  }

  // Get all ideas
  getIdeas() {
    return this.ideas;
  }

  // Get insights
  getInsights() {
    return this.insights;
  }

  getStatus() {
    return {
      ideasGenerated: this.ideas.length,
      insights: this.insights.length,
      associations: Object.keys(this.associations).length,
      creativityLevel: this.creativityLevel
    };
  }
}

module.exports = CreativityModule;
