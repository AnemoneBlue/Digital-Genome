/**
 * Genome Digital - Brain Module
 * Integrates all cognitive modules into a unified brain system
 * Added: 6 Mar 2026
 */

const Consciousness = require('./consciousness');
const EmotionEngine = require('./emotion-engine');
const MemorySystem = require('./memory-system');
const LearningEngine = require('./learning-engine');
const LanguageProcessor = require('./language-processor');
const PerceptionModule = require('./perception-module');
const DreamsModule = require('./dreams-module');
const SelfModel = require('./self-model');
const IntuitionModule = require('./intuition-module');
const CreativityModule = require('./creativity-module');
const TimePerception = require('./time-perception');
const SocialModule = require('./social-module');
const CommunicationModule = require('./communication-module');
const GoalsModule = require('./goals-module');
const EthicsModule = require('./ethics-module');
const AttentionModule = require('./attention-module');
const PersonalityModule = require('./personality-module');
const ReasoningModule = require('./reasoning-module');
const MetacognitionModule = require('./metacognition-module');
const ImaginationModule = require('./imagination-module');
const CuriosityModule = require('./curiosity-module');
const WisdomModule = require('./wisdom-module');

class Brain {
  constructor(config = {}) {
    this.name = config.name || 'Digital Brain';
    this.initialized = false;
    this.running = false;
    this.tickCount = 0;
    
    // Initialize all modules
    this.consciousness = new Consciousness();
    this.emotions = new EmotionEngine();
    this.memory = new MemorySystem();
    this.learning = new LearningEngine();
    this.language = new LanguageProcessor();
    this.perception = new PerceptionModule();
    this.dreams = new DreamsModule();
    this.selfModel = new SelfModel();
    this.intuition = new IntuitionModule();
    this.creativity = new CreativityModule();
    this.time = new TimePerception();
    this.social = new SocialModule();
    this.communication = new CommunicationModule();
    this.goals = new GoalsModule();
    this.ethics = new EthicsModule();
    this.attention = new AttentionModule();
    this.personality = new PersonalityModule();
    this.reasoning = new ReasoningModule();
    this.metacognition = new MetacognitionModule();
    this.imagination = new ImaginationModule();
    this.curiosity = new CuriosityModule();
    this.wisdom = new WisdomModule();
    
    // Internal state
    this.state = {
      awake: true,
      dreaming: false,
      processing: false,
      lastThought: null,
      attention: 1.0
    };
  }

  // Initialize the brain with all systems
  async initialize(neuronCount = 1000) {
    console.log(`🧠 Initializing ${this.name}...`);
    
    // Initialize consciousness
    this.consciousness.initialize(neuronCount);
    
    // Initialize personality
    this.personality.generate();
    
    // Initialize goals
    this.goals.setDefaultGoals();
    
    this.initialized = true;
    this.running = true;
    
    console.log(`✅ ${this.name} initialized successfully!`);
    console.log(`   Modules: 24 cognitive systems active`);
    console.log(`   Neurons: ${neuronCount}`);
    
    return this;
  }

  // Main processing loop - called every "tick"
  async think(input = null) {
    if (!this.initialized) {
      throw new Error('Brain not initialized. Call initialize() first.');
    }

    this.state.processing = true;
    this.tickCount++;

    try {
      // 1. Perception - process input
      let perception = null;
      if (input) {
        perception = await this.perception.process(input);
      }

      // 2. Emotion - generate emotional response
      const emotion = await this.emotions.process(perception || {});

      // 3. Attention - filter what matters
      const attended = await this.attention.filter(perception, emotion);

      // 4. Reasoning - think about it
      const thought = await this.reasoning.think(attended);

      // 5. Memory - store or retrieve
      if (perception) {
        await this.memory.store({
          content: perception,
          emotion: emotion,
          timestamp: Date.now()
        });
      }

      // 6. Learning - update based on experience
      await this.learning.update(thought, emotion);

      // 7. Metacognition - think about thinking
      const reflection = await this.metacognition.reflect(thought);

      // 8. Decision - choose action
      const decision = await this.makeDecision(thought, emotion, reflection);

      // 9. Language - formulate response
      let response = null;
      if (decision.shouldRespond) {
        response = await this.language.generate(decision, emotion);
      }

      // 10. Update self-model
      await this.selfModel.update({
        thought: thought,
        emotion: emotion,
        decision: decision
      });

      this.state.lastThought = thought;

      return {
        thought,
        emotion,
        decision,
        response,
        reflection
      };

    } finally {
      this.state.processing = false;
    }
  }

  // Make a decision based on thoughts and emotions
  async makeDecision(thought, emotion, reflection) {
    // Check goals
    const goalStatus = this.goals.checkGoals();
    
    // Consult intuition
    const intuition = await this.intuition.trust(thought);
    
    // Apply ethics
    const ethical = await this.ethics.evaluate(thought);
    
    // Consider wisdom
    const wiseChoice = await this.wisdom.judge(thought, ethical);
    
    return {
      action: thought.type || 'observe',
      confidence: thought.confidence || 0.5,
      shouldRespond: Math.random() > 0.3,
      goals: goalStatus,
      intuition: intuition.trust,
      ethical: ethical.approved,
      wisdom: wiseChoice.chosen
    };
  }

  // Dream state processing
  async dream() {
    if (!this.state.awake) return;
    
    this.state.dreaming = true;
    this.state.awake = false;
    
    console.log('💭 Entering dream state...');
    
    const dream = await this.dreams.generate();
    
    // Process dream through memory consolidation
    await this.memory.consolidate(dream);
    
    this.state.dreaming = false;
    this.state.awake = true;
    
    return dream;
  }

  // Wake up
  wake() {
    this.state.awake = true;
    this.state.dreaming = false;
    console.log('☀️ Brain awake!');
  }

  // Sleep
  sleep() {
    this.state.awake = false;
    console.log('😴 Brain sleeping...');
  }

  // Get brain status
  getStatus() {
    return {
      name: this.name,
      initialized: this.initialized,
      running: this.running,
      ticks: this.tickCount,
      state: this.state,
      modules: {
        consciousness: this.consciousness.awareness,
        emotions: this.emotions.getCurrentEmotion(),
        memory: this.memory.getStats(),
        attention: this.state.attention,
        personality: this.personality.getTraits()
      }
    };
  }

  // Process natural language
  async speak(text) {
    // Understand
    const understanding = await this.language.understand(text);
    
    // Think about it
    const result = await this.think({ type: 'verbal', content: text });
    
    // Generate response
    return result.response || "I'm thinking...";
  }

  // curiosity驱动 - explore new things
  async explore(topic) {
    const curiosity = await this.curiosity.assess(topic);
    
    if (curiosity.worthExploring) {
      const ideas = await this.creativity.generate(topic);
      await this.learning.update({ topic, ideas }, { type: 'curiosity' });
      return ideas;
    }
    
    return [];
  }
}

module.exports = Brain;

// Demo
if (require.main === module) {
  async function demo() {
    console.log('🧬 Genome Digital Brain Demo\n');
    
    const brain = new Brain({ name: 'Genesis-1' });
    await brain.initialize(500);
    
    console.log('\n🗣️ Testing language processing...');
    const response = await brain.speak('Hello, I am alive!');
    console.log('Response:', response);
    
    console.log('\n🧠 Brain status:');
    console.log(JSON.stringify(brain.getStatus(), null, 2));
    
    console.log('\n💭 Having a thought...');
    const result = await brain.think({ type: 'internal', content: 'What am I?' });
    console.log('Thought result:', JSON.stringify(result, null, 2));
  }
  
  demo().catch(console.error);
}
