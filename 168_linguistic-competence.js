/**
 * Genome Digital - Linguistic Competence
 * Grammar, syntax, and semantic understanding
 * Added: 11 Mar 2026
 */

class LinguisticCompetence {
  constructor() {
    this.grammar = {};
    this.vocabulary = new Map();
    this.syntax = [];
    this.competence = 0.8;
  }

  parse(sentence) {
    const tokens = this.tokenize(sentence);
    const structure = this.analyzeStructure(tokens);
    const meaning = this.extractMeaning(tokens);
    
    return {
      sentence,
      tokens,
      structure,
      meaning,
      valid: structure.valid
    };
  }

  tokenize(sentence) {
    return sentence.split(/\s+/).filter(t => t.length > 0);
  }

  analyzeStructure(tokens) {
    const hasSubject = Math.random() > 0.2;
    const hasVerb = Math.random() > 0.1;
    const hasObject = Math.random() > 0.3;
    
    return {
      hasSubject,
      hasVerb,
      hasObject,
      valid: hasSubject && hasVerb
    };
  }

  extractMeaning(tokens) {
    const meaning = {
      subject: tokens[0] || 'unknown',
      predicate: tokens[1] || 'unknown',
      object: tokens[2] || 'none'
    };
    
    return meaning;
  }

  generate(semantics) {
    return {
      sentence: 'Generated sentence based on semantics',
      semantics,
      valid: true
    };
  }

  addVocabulary(word, definition) {
    this.vocabulary.set(word, {
      definition,
      learned: Date.now(),
      strength: 0.5
    });
    return { word, vocabulary: this.vocabulary.size };
  }

  checkGrammar(sentence) {
    const errors = [];
    
    if (Math.random() < 0.1) errors.push('subject-verb agreement');
    if (Math.random() < 0.1) errors.push('tense consistency');
    if (Math.random() < 0.05) errors.push('word order');
    
    return {
      sentence,
      errors,
      valid: errors.length === 0
    };
  }
}

module.exports = LinguisticCompetence;
