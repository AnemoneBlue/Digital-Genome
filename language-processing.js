/**
 * Genome Digital - Language Processing Module
 * Processes and generates language
 * Added: 12 Mar 2026
 */

class LanguageProcessing {
  constructor() {
    this.vocabulary = {};
    this.grammar = {};
    this.conversations = [];
    this.currentConversation = null;
  }

  // Learn a word
  learnWord(word, definition, category = 'general') {
    if (!this.vocabulary[category]) {
      this.vocabulary[category] = [];
    }

    // Check if word already exists
    const exists = this.vocabulary[category].find(w => w.word === word);
    if (exists) {
      return { learned: false, reason: 'already_exists' };
    }

    this.vocabulary[category].push({
      word: word.toLowerCase(),
      definition,
      learnedAt: Date.now(),
      usageCount: 0
    });

    return { learned: true, category, totalWords: this.vocabulary[category].length };
  }

  // Parse input (tokenize)
  parse(input) {
    const tokens = input
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 0);

    const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);

    return {
      original: input,
      tokens,
      sentenceCount: sentences.length,
      wordCount: tokens.length
    };
  }

  // Understand intent
  understand(input) {
    const parsed = this.parse(input);
    
    let intent = 'unknown';
    const entities = [];

    // Simple intent classification
    const greetings = ['hello', 'hi', 'hey', 'greetings'];
    const questions = ['what', 'how', 'why', 'when', 'where', 'who', 'which'];
    const commands = ['go', 'do', 'make', 'create', 'stop', 'start', 'give'];

    if (greetings.some(g => parsed.tokens.includes(g))) {
      intent = 'greeting';
    } else if (parsed.tokens.some(t => questions.includes(t))) {
      intent = 'question';
    } else if (parsed.tokens.some(t => commands.includes(t))) {
      intent = 'command';
    } else if (parsed.tokens.includes('?') || input.includes('?')) {
      intent = 'question';
    }

    // Extract entities (simple noun detection)
    const nouns = ['food', 'water', 'location', 'person', 'object', 'time'];
    parsed.tokens.forEach(token => {
      if (nouns.includes(token)) {
        entities.push({ type: token, value: token });
      }
    });

    return {
      intent,
      entities,
      tokens: parsed.tokens,
      confidence: intent !== 'unknown' ? 0.8 : 0.3
    };
  }

  // Generate response
  generate(intent, context = {}) {
    const templates = {
      greeting: [
        'Hello! How can I help you?',
        'Hi there! What would you like to do?',
        'Greetings! I am ready to assist.'
      ],
      question: [
        'That is an interesting question.',
        'Let me think about that...',
        'Based on my knowledge:'
      ],
      command: [
        'I will do that.',
        'Understood. Executing...',
        'Consider it done.'
      ],
      unknown: [
        'I am not sure I understand.',
        'Could you rephrase that?',
        'Tell me more.'
      ]
    };

    const responses = templates[intent] || templates.unknown;
    const response = responses[Math.floor(Math.random() * responses.length)];

    return { response, intent };
  }

  // Start conversation
  startConversation(partner = 'user') {
    this.currentConversation = {
      id: Date.now(),
      partner,
      messages: [],
      startedAt: Date.now()
    };

    this.conversations.push(this.currentConversation);
    return { conversationStarted: true, id: this.currentConversation.id };
  }

  // Add message to conversation
  addMessage(text, sender = 'user') {
    if (!this.currentConversation) {
      this.startConversation();
    }

    const message = {
      id: Date.now(),
      text,
      sender,
      timestamp: Date.now()
    };

    this.currentConversation.messages.push(message);
    return { messageAdded: true };
  }

  // Get vocabulary
  getVocabulary() {
    return this.vocabulary;
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversations;
  }

  getStatus() {
    const totalWords = Object.values(this.vocabulary)
      .reduce((sum, arr) => sum + arr.length, 0);
    
    return {
      vocabularySize: totalWords,
      categories: Object.keys(this.vocabulary).length,
      conversations: this.conversations.length,
      currentConversation: this.currentConversation ? 'active' : 'none'
    };
  }
}

module.exports = LanguageProcessing;
