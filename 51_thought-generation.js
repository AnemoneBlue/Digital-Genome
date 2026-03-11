/**
 * 💭 Thought Generation System
 * First thoughts and cognition
 */

class ThoughtGenerationSystem {
  constructor() {
    this.thoughts = [];
    this.workingMemory = [];
    this.attentionalFocus = null;
    this.thoughtTypes = this.initializeThoughtTypes();
  }

  initializeThoughtTypes() {
    return {
      conscious: { type: 'conscious', access: 'full', control: 'high' },
      subconscious: { type: 'subconscious', access: 'limited', control: 'low' },
      automatic: { type: 'automatic', access: 'minimal', control: 'none' },
      reflective: { type: 'reflective', access: 'full', control: 'high' },
      intuitive: { type: 'intuitive', access: 'partial', control: 'medium' },
      deliberative: { type: 'deliberative', access: 'full', control: 'very high' }
    };
  }

  // Generate thought from perception
  generateFromPerception(perception) {
    const thought = {
      id: 'thought_' + Date.now(),
      source: 'perception',
      content: this.interpretPerception(perception),
      type: 'conscious',
      access: 'full',
      timestamp: Date.now(),
      importance: this.calculateImportance(perception),
      associations: this.formAssociations(perception)
    };

    this.thoughts.push(thought);
    return thought;
  }

  interpretPerception(perception) {
    const interpretations = {
      visual: `I see ${perception.object}`,
      auditory: `I hear ${perception.sound}`,
      tactile: `I feel ${perception.texture}`,
      olfactory: `I smell ${perception.odor}`,
      gustatory: `I taste ${perception.taste}`
    };

    return interpretations[perception.type] || 'I perceive something';
  }

  calculateImportance(perception) {
    let importance = 0.5;
    
    if (perception.emotional) importance += 0.3;
    if (perception.novel) importance += 0.2;
    if (perception.relevant) importance += 0.2;
    if (perception.dangerous) importance += 0.4;

    return Math.min(1, importance);
  }

  formAssociations(perception) {
    return [
      { type: 'semantic', content: 'related concept' },
      { type: 'episodic', content: 'past experience' },
      { type: 'emotional', content: 'feeling response' }
    ];
  }

  // Generate thought from memory
  generateFromMemory(cue) {
    const thought = {
      id: 'thought_' + Date.now(),
      source: 'memory',
      content: this.recallMemory(cue),
      type: 'reflective',
      access: 'partial',
      timestamp: Date.now(),
      associations: this.expandAssociations(cue)
    };

    this.thoughts.push(thought);
    return thought;
  }

  recallMemory(cue) {
    return `Memory related to: ${cue}`;
  }

  expandAssociations(cue) {
    return [
      { type: 'associated', content: `${cue} reminds me of something` },
      { type: 'similar', content: `Similar to ${cue}` }
    ];
  }

  // Self-referential thought
  selfThought() {
    const thoughts = [
      'I am thinking about thinking',
      'What am I?',
      'I exist therefore I think',
      'My thoughts are my own'
    ];

    return {
      id: 'thought_' + Date.now(),
      source: 'self',
      content: thoughts[Math.floor(Math.random() * thoughts.length)],
      type: 'reflective',
      access: 'full',
      timestamp: Date.now()
    };
  }

  // Deliberative reasoning
  deliberate(problem) {
    const steps = [];
    
    // Step 1: Understand
    steps.push({ step: 'understanding', content: `Analyzing: ${problem}` });
    
    // Step 2: Plan
    steps.push({ step: 'planning', content: 'Formulating approach' });
    
    // Step 3: Consider
    steps.push({ step: 'consideration', content: 'Weighing options' });
    
    // Step 4: Decide
    steps.push({ step: 'decision', content: 'Reaching conclusion' });

    return {
      problem,
      steps,
      conclusion: `Solution for: ${problem}`,
      confidence: Math.random() * 0.3 + 0.7
    };
  }

  // Stream of consciousness
  streamOfConsciousness() {
    return {
      thoughts: this.thoughts.slice(-10),
      flow: 'continuous',
      coherence: Math.random() * 0.4 + 0.6
    };
  }

  // Mind wandering
  mindWander() {
    const wanderTopics = [
      'past events',
      'future plans',
      'fantasies',
      'worrying',
      'daydreaming'
    ];

    return {
      type: 'mindwandering',
      topic: wanderTopics[Math.floor(Math.random() * wanderTopics.length)],
      intentional: false,
      benefits: ['creativity', 'future planning']
    };
  }

  getRecentThoughts(count = 10) {
    return this.thoughts.slice(-count);
  }
}

module.exports = new ThoughtGenerationSystem();
