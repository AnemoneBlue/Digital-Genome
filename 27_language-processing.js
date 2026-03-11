/**
 * 🗣️ Language Processing System
 * Text understanding and generation
 */

class LanguageProcessingSystem {
  constructor() {
    this.vocabulary = new Map();
    this.grammar = this.initializeGrammar();
    this.semantics = new Map();
    this.pragmatics = new Map();
  }

  initializeGrammar() {
    return {
      syntax: {
        structure: ['SVO', 'SVC', 'SVA', 'SVOO', 'SVOC'],
        rules: ['subject-verb-agreement', 'word-order', 'tense-conjugation']
      },
      morphology: {
        prefixes: 50,
        suffixes: 80,
        inflections: 200
      },
      phonology: {
        vowels: ['a', 'e', 'i', 'o', 'u'],
        consonants: 21,
        stressRules: true
      }
    };
  }

  // Tokenize text
  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  // Parse sentence structure
  parse(sentence) {
    const tokens = this.tokenize(sentence);
    
    return {
      tokens,
      structure: this.detectStructure(tokens),
      subject: this.findSubject(tokens),
      verb: this.findVerb(tokens),
      object: this.findObject(tokens),
      modifiers: this.findModifiers(tokens)
    };
  }

  detectStructure(tokens) {
    const patterns = {
      imperative: /^(go|do|be|have|get|make|let|tell|ask)/,
      question: /^(what|who|where|when|why|how|is|are|do|does|can|will)/,
      statement: /^(the|a|an|i|he|she|it|we|they)/
    };

    if (patterns.imperative.test(tokens[0])) return 'imperative';
    if (patterns.question.test(tokens[0])) return 'question';
    return 'statement';
  }

  findSubject(tokens) {
    const subjects = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the'];
    return tokens.find(t => subjects.includes(t)) || null;
  }

  findVerb(tokens) {
    const verbs = ['is', 'are', 'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did', 'go', 'went', 'get', 'got', 'make', 'made', 'say', 'said', 'tell', 'told'];
    return tokens.find(t => verbs.includes(t)) || null;
  }

  findObject(tokens) {
    const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'in', 'on', 'at'];
    return tokens.filter(t => !stopWords.includes(t)).slice(-1)[0] || null;
  }

  findModifiers(tokens) {
    const modifiers = ['very', 'really', 'quite', 'just', 'still', 'already'];
    return tokens.filter(t => modifiers.includes(t));
  }

  // Semantic analysis
  analyzeSemantics(sentence) {
    const parsed = this.parse(sentence);
    const meaning = {
      proposition: this.extractProposition(parsed),
      truthConditions: this.getTruthConditions(parsed),
      entailments: this.getEntailments(parsed),
      contradictions: this.getContradictions(parsed)
    };

    return meaning;
  }

  extractProposition(parsed) {
    return {
      who: parsed.subject,
      what: parsed.verb,
      whom: parsed.object
    };
  }

  getTruthConditions(parsed) {
    return {
      known: true,
      verifiable: parsed.verb !== null
    };
  }

  getEntailments(parsed) {
    return ['Someone did something'];
  }

  getContradictions(parsed) {
    return [];
  }

  // Generate response
  generate(intent, entities) {
    const templates = {
      greeting: ['Hello!', 'Hi there!', 'Hey!'],
      farewell: ['Goodbye!', 'See you later!', 'Bye!'],
      thanks: ['You\'re welcome!', 'No problem!', 'Glad to help!'],
      apology: ['I\'m sorry', 'I apologize', 'My apologies'],
      confirmation: ['Yes', 'Of course', 'Certainly'],
      denial: ['No', 'I don\'t think so', 'Not really']
    };

    const responses = templates[intent] || ['I understand'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Add to vocabulary
  learnWord(word, definition, context) {
    this.vocabulary.set(word.toLowerCase(), {
      definition,
      context,
      usageCount: 0,
      learned: Date.now()
    });
    return { learned: word, total: this.vocabulary.size };
  }

  getVocabularySize() {
    return this.vocabulary.size;
  }
}

module.exports = new LanguageProcessingSystem();
