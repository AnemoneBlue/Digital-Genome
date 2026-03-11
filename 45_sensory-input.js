/**
 * Genome Digital - Sensory Integration Module
 * Processes inputs from various sensors (camera, text, audio)
 * Added: 6 Mar 2026
 */

class SensoryInput {
  constructor() {
    this.sensors = {
      camera: false,
      microphone: false,
      text: true,
      network: false
    };
    
    this.inputHistory = [];
    this.processingQueue = [];
  }

  // Process text input
  processText(text) {
    return {
      type: 'text',
      content: text,
      timestamp: Date.now(),
      features: this.extractFeatures(text)
    };
  }

  // Extract features from text
  extractFeatures(text) {
    const words = text.toLowerCase().split(/\s+/);
    return {
      wordCount: words.length,
      charCount: text.length,
      hasQuestion: text.includes('?'),
      hasExclamation: text.includes('!'),
      sentiment: this.estimateSentiment(text),
      topics: this.extractTopics(words),
      urgency: this.estimateUrgency(text)
    };
  }

  // Simple sentiment analysis
  estimateSentiment(text) {
    const positive = ['happy', 'good', 'great', 'love', 'wonderful', 'amazing', 'yes', 'da', 'bun', 'frumos'];
    const negative = ['sad', 'bad', 'terrible', 'hate', 'no', 'nu', 'rău', 'urât'];
    
    const lower = text.toLowerCase();
    let score = 0;
    
    positive.forEach(w => { if (lower.includes(w)) score += 1; });
    negative.forEach(w => { if (lower.includes(w)) score -= 1; });
    
    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  }

  // Extract topics (simple keyword matching)
  extractTopics(words) {
    const topics = {
      science: ['ai', 'brain', 'quantum', 'dna', 'science', 'research'],
      emotion: ['feel', 'happy', 'sad', 'love', 'fear', 'emoție'],
      self: ['i', 'me', 'my', 'who', 'what am i', 'eu'],
      action: ['do', 'make', 'create', 'build', 'think', 'acț']
    };
    
    const found = [];
    const text = words.join(' ');
    
    for (const [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(k => text.includes(k))) {
        found.push(topic);
      }
    }
    
    return found;
  }

  // Estimate urgency
  estimateUrgency(text) {
    const urgent = ['urgent', 'asap', 'immediately', 'acum', 'rapid', 'help'];
    const lower = text.toLowerCase();
    
    if (urgent.some(w => lower.includes(w))) return 'high';
    if (text.includes('?')) return 'medium';
    return 'low';
  }

  // Process image (simulated - would need actual image processing)
  processImage(imageData) {
    return {
      type: 'image',
      content: '[Image data]',
      timestamp: Date.now(),
      features: {
        hasFaces: Math.random() > 0.5,
        hasText: Math.random() > 0.7,
        dominantColors: ['#unknown'],
        description: 'Visual input processed'
      }
    };
  }

  // Process audio
  processAudio(audioData) {
    return {
      type: 'audio',
      content: '[Audio data]',
      timestamp: Date.now(),
      features: {
        hasSpeech: true,
        language: 'unknown',
        emotion: 'neutral',
        volume: 0.5
      }
    };
  }

  // Queue input for processing
  queue(input) {
    this.processingQueue.push(input);
    return this.processingQueue.length;
  }

  // Get next queued input
  dequeue() {
    return this.processingQueue.shift();
  }

  // Get input history
  getHistory(limit = 10) {
    return this.inputHistory.slice(-limit);
  }

  // Enable/disable sensors
  enableSensor(sensor) {
    if (this.sensors.hasOwnProperty(sensor)) {
      this.sensors[sensor] = true;
      return true;
    }
    return false;
  }

  disableSensor(sensor) {
    if (this.sensors.hasOwnProperty(sensor)) {
      this.sensors[sensor] = false;
      return true;
    }
    return false;
  }

  // Get available sensors
() {
    return  getSensors { ...this.sensors };
  }
}

// Text analysis demo
if (require.main === module) {
  const input = new SensoryInput();
  
  console.log('🧪 Testing Sensory Input:\n');
  
  // Test text processing
  const tests = [
    'Hello, how are you?',
    'I am feeling wonderful today!',
    'URGENT: Help me now!',
    'Ce faci? Ești bine?',
    'Who am I? What is my purpose?'
  ];
  
  tests.forEach(text => {
    const result = input.processText(text);
    console.log(`Text: "${text}"`);
    console.log(`  → Sentiment: ${result.features.sentiment}`);
    console.log(`  → Topics: ${result.features.topics.join(', ') || 'none'}`);
    console.log(`  → Urgency: ${result.features.urgency}`);
    console.log();
  });
}

module.exports = SensoryInput;
