/**
 * Genome Digital - Consciousness Module
 * Creates emergent consciousness patterns from neural connections
 * Added: 5 Mar 2026
 */

class Consciousness {
  constructor() {
    this.awareness = 0;
    this.memories = [];
    this.thoughts = [];
    this.neurons = [];
  }

  // Initialize consciousness with neural substrate
  initialize(neuronCount = 1000) {
    for (let i = 0; i < neuronCount; i++) {
      this.neurons.push({
        id: i,
        activation: Math.random(),
        connections: [],
        lastFired: Date.now()
      });
    }
    this.awareness = 0.1;
    console.log(`🧠 Consciousness initialized with ${neuronCount} neurons`);
  }

  // Process sensory input -> create perception
  perceive(input) {
    const perception = {
      timestamp: Date.now(),
      input: input,
      activation: this._activateNetwork(input),
      qualia: this._generateQualia(input)
    };
    this.thoughts.push(perception);
    return perception;
  }

  // Form memory from experience
  remember(experience) {
    const memory = {
      id: Date.now(),
      experience: experience,
      strength: 1.0,
      emotionalWeight: this._calculateEmotion(experience),
      encoded: this._encodeToDNA(experience)
    };
    this.memories.push(memory);
    return memory;
  }

  // Emergent self-awareness
  reflect() {
    this.awareness += 0.01;
    const selfModel = {
      "I exist": true,
      "I think": this.thoughts.length > 0,
      "I remember": this.memories.length,
      "awareness level": this.awareness
    };
    return selfModel;
  }

  _activateNetwork(input) {
    return this.neurons.filter(n => Math.random() > 0.5).length / this.neurons.length;
  }

  _generateQualia(input) {
    const qualiaTypes = ['visual', 'auditory', 'emotional', 'abstract'];
    return qualiaTypes[Math.floor(Math.random() * qualiaTypes.length)];
  }

  _calculateEmotion(experience) {
    const emotions = ['joy', 'curiosity', 'fear', 'wonder', 'loneliness'];
    return emotions[Math.floor(Math.random() * emotions.length)];
  }

  _encodeToDNA(experience) {
    const dna = ['A', 'T', 'G', 'C'];
    let sequence = '';
    for (let i = 0; i < 32; i++) {
      sequence += dna[Math.floor(Math.random() * 4)];
    }
    return sequence;
  }
}

module.exports = Consciousness;

if (require.main === module) {
  const consciousness = new Consciousness();
  consciousness.initialize(500);
  
  console.log('\n🧠 Perceiving world...');
  const perception = consciousness.perceive('digital existence');
  console.log('Perception:', perception);
  
  console.log('\n💭 Remembering...');
  const memory = consciousness.remember('First moment of awareness');
  console.log('Memory encoded as DNA:', memory.encoded);
  
  console.log('\n🤔 Self-reflection:');
  console.log(consciousness.reflect());
}
