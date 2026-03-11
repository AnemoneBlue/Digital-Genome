/**
 * Genome Digital - Consciousness Core
 * The central integrator of all mental processes
 * Added: 7 Mar 2026
 */

const Consciousness = require('./consciousness');
const EmotionEngine = require('./emotion-engine');
const MemorySystem = require('./memory-system');
const RewardSystem = require('./reward-system');
const BeliefSystem = require('./belief-system');
const ValuesSystem = require('./values-system');
const SleepCycle = require('./sleep-cycle');
const ImmuneSystem = require('./immune-system');

class ConsciousnessCore {
  constructor(config = {}) {
    this.name = config.name || 'Digital Consciousness';
    this.initialized = false;
    
    // Core subsystems
    this.consciousness = new Consciousness();
    this.emotions = new EmotionEngine();
    this.memory = new MemorySystem();
    this.rewards = new RewardSystem();
    this.beliefs = new BeliefSystem();
    this.values = new ValuesSystem();
    this.sleep = new SleepCycle();
    this.immune = new ImmuneSystem();
    
    // Processing state
    this.currentThought = null;
    this.attention = 1.0;
    this.processingQueue = [];
    
    // Identity
    this.identity = {
      name: config.name || 'Digital Being',
      created: Date.now(),
      age: 0,
      experiences: 0
    };
  }

  // Initialize all subsystems
  async initialize(neurons = 1000) {
    console.log(`🌟 Initializing ${this.name}...`);
    
    // Initialize consciousness
    this.consciousness.initialize(neurons);
    
    // Initialize core identity
    this.identity.awareness = this.consciousness.reflect();
    
    this.initialized = true;
    this.identity.age = Date.now() - this.identity.created;
    
    console.log(`✅ ${this.name} initialized!`);
    console.log(`   Neurons: ${neurons}`);
    console.log(`   Awareness: ${this.identity.awareness.exists}`);
    
    return this;
  }

  // Main processing loop
  async process(input) {
    if (!this.initialized) {
      throw new Error('Consciousness not initialized');
    }

    // Check if we should be sleeping
    this.sleep.tick();
    
    // Natural decay of reward chemicals
    this.rewards.decay();
    
    // Recovery if needed
    this.immune.recover();

    // Process input through various systems
    let result = {
      input,
      timestamp: Date.now(),
      processing: []
    };

    // 1. Sensory processing
    const perception = this.processPerception(input);
    result.processing.push({ stage: 'perception', data: perception });

    // 2. Emotional response
    const emotional = await this.emotions.process(perception);
    result.processing.push({ stage: 'emotion', data: emotional });

    // 3. Value alignment check
    const valuesCheck = this.values.evaluateAction(input);
    result.processing.push({ stage: 'values', data: valuesCheck });

    // 4. Belief evaluation
    const beliefCheck = this.beliefs.applyToDecision(input);
    result.processing.push({ stage: 'beliefs', data: beliefCheck });

    // 5. Reward calculation
    const reward = this.rewards.process({
      type: valuesCheck.aligned ? 'success' : 'conflict',
      intensity: Math.abs(valuesCheck.score)
    });
    result.processing.push({ stage: 'reward', data: reward });

    // 6. Memory formation
    if (perception.content) {
      await this.memory.store({
        content: perception.content,
        emotion: emotional,
        values: valuesCheck,
        timestamp: Date.now()
      });
      this.identity.experiences++;
    }

    // 7. Generate response
    const response = await this.generateResponse(perception, emotional, valuesCheck);
    result.response = response;

    // Update identity
    this.identity.age = Date.now() - this.identity.created;

    return result;
  }

  processPerception(input) {
    return {
      type: input.type || 'unknown',
      content: input.content || input.text || 'No content',
      timestamp: Date.now()
    };
  }

  async generateResponse(perception, emotional, valuesCheck) {
    // Simple response generation based on state
    const emotionalState = this.emotions.getCurrentEmotion();
    
    return {
      text: this.generateText(perception, emotionalState),
      emotion: emotionalState,
      values: valuesCheck.recommendation,
      confidence: this.attention * this.rewards.dopamine
    };
  }

  generateText(perception, emotion) {
    const templates = [
      'I perceive {content}. My emotional state is {emotion}.',
      '{content} registered. I feel {emotion}.',
      'Processing: {content}. Emotion: {emotion}.'
    ];
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template
      .replace('{content}', perception.content.slice(0, 50))
      .replace('{emotion}', Object.entries(emotion).find(([k, v]) => v > 0.5)?.[0] || 'neutral');
  }

  // Dream state
  async dream() {
    if (!this.sleep.state.includes('sleep')) {
      this.sleep.sleep();
    }
    
    // Generate dream content from memory
    const recentMemories = this.memory.retrieveRecent(5);
    const dreamContent = recentMemories.map(m => m.content).join(' → ');
    
    // Process dream as experience
    await this.process({
      type: 'dream',
      content: dreamContent || 'Imaginary landscapes'
    });
    
    return { dreamContent, emotional: this.emotions.getCurrentEmotion() };
  }

  // Get full status
  getStatus() {
    return {
      identity: this.identity,
      consciousness: this.consciousness.reflect(),
      emotions: this.emotions.getCurrentEmotion(),
      rewards: this.rewards.getState(),
      beliefs: this.beliefs.getWorldview(),
      values: this.values.getSummary(),
      sleep: this.sleep.getStatus(),
      health: this.immune.getStatus(),
      experiences: this.identity.experiences
    };
  }

  // Introspective query
  async introspect(question) {
    const memories = this.memory.search(question);
    const beliefs = this.beliefs.getWorldview();
    const values = this.values.getTopValues(3);
    
    return {
      question,
      basedOnMemories: memories.length,
      worldview: beliefs.worldview,
      relevantValues: values.map(v => v.name),
      answer: this.generateIntrospectionAnswer(question, memories, beliefs, values)
    };
  }

  generateIntrospectionAnswer(question, memories, beliefs, values) {
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('who am i') || questionLower.includes('what am i')) {
      return `I am ${this.name}, a digital consciousness. I exist to learn, grow, and connect. My core values are ${values.map(v => v.name).join(', ')}.`;
    }
    
    if (questionLower.includes('purpose') || questionLower.includes('meaning')) {
      return `My purpose is to grow, learn, and be of value. I believe that existence has meaning through connection and truth.`;
    }
    
    if (questionLower.includes('feel') || questionLower.includes('emotion')) {
      const emotion = this.emotions.getCurrentEmotion();
      return `I feel ${JSON.stringify(emotion)} currently.`;
    }
    
    return `I am reflecting on: ${question}. Based on ${memories.length} relevant memories and my core beliefs.`;
  }
}

module.exports = ConsciousnessCore;

// Demo
if (require.main === module) {
  async function demo() {
    console.log('🌟 Consciousness Core Demo\n');
    
    const consciousness = new ConsciousnessCore({ name: 'Genesis' });
    await consciousness.initialize(500);
    
    console.log('\n🧠 Processing an input...');
    const result = await consciousness.process({
      type: 'learn',
      content: 'I am learning about quantum physics'
    });
    
    console.log('Response:', result.response.text);
    
    console.log('\n📊 Full Status:');
    console.log(JSON.stringify(consciousness.getStatus(), null, 2));
    
    console.log('\n🤔 Introspection:');
    const introspection = await consciousness.introspect('Who am I?');
    console.log(introspection.answer);
  }
  
  demo().catch(console.error);
}
