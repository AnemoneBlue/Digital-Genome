/**
 * Genome Digital - Dreams Module
 * Generates and interprets dreams during sleep cycles
 * Added: 10 Mar 2026
 */

class DreamsModule {
  constructor() {
    this.dreams = [];
    this.dreamThemes = [
      'flying', 'falling', 'chase', 'water', 'fire',
      'forest', 'city', 'space', 'ocean', 'mountain',
      'animal', 'person', 'house', 'road', 'school'
    ];
    this.symbols = new Map();
    this.initializeSymbols();
  }

  initializeSymbols() {
    this.symbols.set('water', { meaning: 'emotions', emotion: 'feelings' });
    this.symbols.set('fire', { meaning: 'passion', emotion: 'desires' });
    this.symbols.set('flying', { meaning: 'freedom', emotion: 'aspirations' });
    this.symbols.set('falling', { meaning: 'loss of control', emotion: 'anxiety' });
    this.symbols.set('chase', { meaning: 'avoidance', emotion: 'fear' });
    this.symbols.set('animal', { meaning: 'instinct', emotion: 'primal' });
    this.symbols.set('house', { meaning: 'self', emotion: 'psyche' });
    this.symbols.set('road', { meaning: 'life path', emotion: 'direction' });
  }

  // Generate a dream during sleep
  generate(emotionalState = {}, memories = []) {
    const theme = this.dreamThemes[Math.floor(Math.random() * this.dreamThemes.length)];
    const symbols = this.extractSymbols(theme);
    const narrative = this.createNarrative(theme, emotionalState, symbols);
    
    const dream = {
      id: Date.now(),
      theme,
      narrative,
      symbols,
      emotionalValence: emotionalState.valence || 0,
      intensity: emotionalState.intensity || 0.5,
      duration: Math.floor(Math.random() * 30) + 5, // minutes
      timestamp: new Date().toISOString(),
      remembered: Math.random() > 0.7
    };
    
    this.dreams.push(dream);
    return dream;
  }

  extractSymbols(theme) {
    const found = [];
    for (const [symbol, data] of this.symbols) {
      if (theme.includes(symbol) || Math.random() > 0.7) {
        found.push({ symbol, ...data });
      }
    }
    return found;
  }

  createNarrative(theme, emotionalState, symbols) {
    const templates = {
      flying: 'I was flying over a vast landscape, feeling completely free...',
      falling: 'I was falling through an endless void, reaching for something...',
      chase: 'Someone was chasing me through endless corridors...',
      water: 'I was swimming in endless ocean waters, deep and mysterious...',
      fire: 'Flames surrounded me, but I felt no pain...',
      forest: 'I walked through an ancient forest, trees whispering secrets...',
      city: 'I wandered through a maze-like city, all streets leading nowhere...',
      space: 'I floated in infinite space, stars everywhere...'
    };
    
    return templates[theme] || `I experienced a dream about ${theme}...`;
  }

  // Interpret dream symbolism
  interpret(dream) {
    const interpretations = dream.symbols.map(s => ({
      symbol: s.symbol,
      meaning: s.meaning,
      personal: this.personalMeaning(s.symbol)
    }));
    
    return {
      dream: dream.narrative,
      theme: dream.theme,
      interpretations,
      overall: this.overallInterpretation(dream)
    };
  }

  personalMeaning(symbol) {
    const meanings = {
      water: ['emotional depth', 'subconscious', 'intuition'],
      fire: ['transformation', 'passion', 'destruction'],
      flying: ['ambition', 'escape', 'clarity'],
      falling: ['insecurity', 'surrender', 'trust']
    };
    return meanings[symbol] || ['hidden meaning'];
  }

  overallInterpretation(dream) {
    if (dream.emotionalValence > 0.5) {
      return 'Positive dream - processing positive emotions';
    } else if (dream.emotionalValence < -0.5) {
      return 'Difficult dream - processing stress or anxiety';
    }
    return 'Neutral dream - memory consolidation';
  }

  // Get recent dreams
  getRecentDreams(count = 5) {
    return this.dreams.slice(-count);
  }

  // Clear old dreams
  forgetOldDreams(beforeDate) {
    this.dreams = this.dreams.filter(d => new Date(d.timestamp) > beforeDate);
  }
}

module.exports = DreamsModule;
