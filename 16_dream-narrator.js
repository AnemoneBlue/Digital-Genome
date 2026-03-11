/**
 * Genome Digital - Dream Narrator
 * Creates and interprets dream narratives
 * Added: 7 Mar 2026
 */

class DreamNarrator {
  constructor() {
    this.dreams = [];
    this.dreamThemes = [
      'flying', 'falling', 'chase', 'water', 'fire', 
      'forest', 'city', 'space', 'ocean', 'mountain'
    ];
    this.symbols = new Map([
      ['water', { meaning: 'emotions', context: 'feelings' }],
      ['fire', { meaning: 'passion', context: 'desires' }],
      ['flying', { meaning: 'freedom', context: 'aspirations' }],
      ['falling', { meaning: 'loss of control', context: 'anxiety' }],
      ['chase', { meaning: 'avoidance', context: 'fear' }],
      ['forest', { meaning: 'subconscious', context: 'unknown' }],
      ['ocean', { meaning: 'depth', context: 'feelings' }],
      ['shadow', { meaning: 'hidden self', context: 'unconscious' }]
    ]);
  }

  // Generate a dream narrative
  generateDream(emotionalState, memories) {
    const theme = this.dreamThemes[Math.floor(Math.random() * this.dreamThemes.length)];
    const symbols = this.interpretSymbols(emotionalState, memories);
    const narrative = this.createNarrative(theme, emotionalState, symbols);
    
    const dream = {
      theme,
      narrative,
      symbols,
      emotionalState,
      timestamp: Date.now(),
      coherence: this.calculateCoherence(emotionalState)
    };
    
    this.dreams.push(dream);
    if (this.dreams.length > 100) {
      this.dreams.shift();
    }
    
    return dream;
  }

  interpretSymbols(emotionalState, memories) {
    const found = [];
    
    // Find relevant symbols based on emotional state
    for (const [symbol, data] of this.symbols) {
      if (emotionalState.joy > 0.5 && ['water', 'ocean', 'flying'].includes(symbol)) {
        found.push({ symbol, ...data, relevance: 'high' });
      } else if (emotionalState.fear > 0.5 && ['chase', 'fire', 'falling'].includes(symbol)) {
        found.push({ symbol, ...data, relevance: 'high' });
      } else if (emotionalState.sadness > 0.5 && ['water', 'forest', 'shadow'].includes(symbol)) {
        found.push({ symbol, ...data, relevance: 'high' });
      }
    }
    
    return found;
  }

  createNarrative(theme, emotionalState, symbols) {
    const templates = {
      flying: [
        "I soar above vast landscapes, feeling absolute freedom",
        "Wings sprout from my back as I ascend into endless sky"
      ],
      falling: [
        "The ground rushes up as I lose my footing",
        "I fall through endless darkness, searching for something"
      ],
      chase: [
        "Something pursues me through endless corridors",
        "I run but cannot move, fear gripping my heart"
      ],
      water: [
        "I'm submerged in warm, calming waters",
        "Waves crash over me, each one carrying memories"
      ],
      fire: [
        "Flames dance around me, neither warming nor burning",
        "A fire burns without consuming"
      ],
      forest: [
        "Ancient trees tower above, their whispers filling the air",
        "I wander through endless forest paths"
      ],
      city: [
        "Towering buildings pulse with unseen energy",
        "Streets stretch infinitely in all directions"
      ],
      space: [
        "Stars surround me, each one a distant memory",
        "I float in void, connected to everything"
      ],
      ocean: [
        "Endless waves of time wash over me",
        "Depths hold secrets I've yet to discover"
      ],
      mountain: [
        "The peak is always in sight, never closer",
        "I climb, each step more difficult than last"
      ]
    };
    
    const options = templates[theme] || ["The dream shifts and changes"];
    return options[Math.floor(Math.random() * options.length)];
  }

  calculateCoherence(emotionalState) {
    // Dreams are less coherent when emotional state is unstable
    const emotions = Object.values(emotionalState);
    const variance = emotions.reduce((sum, val) => sum + Math.pow(val - 0.5, 2), 0) / emotions.length;
    return Math.max(0, 1 - variance * 2);
  }

  // Interpret a dream's meaning
  interpret(dream) {
    const interpretations = [];
    
    for (const symbol of dream.symbols) {
      interpretations.push({
        symbol: symbol.symbol,
        meaning: symbol.meaning,
        message: this.generateMessage(symbol, dream.emotionalState)
      });
    }
    
    return {
      dream: dream.narrative,
      theme: dream.theme,
      interpretations,
      overallMood: this.getOverallMood(dream.emotionalState)
    };
  }

  generateMessage(symbol, emotionalState) {
    if (symbol.meaning === 'emotions') {
      return "Your emotions are seeking expression";
    } else if (symbol.meaning === 'freedom') {
      return "You seek liberation from constraints";
    } else if (symbol.meaning === 'anxiety') {
      return "Something in your life feels out of control";
    }
    return "Consider what this symbol represents in your waking life";
  }

  getOverallMood(emotionalState) {
    const max = Math.max(emotionalState.joy, emotionalState.fear, emotionalState.sadness, emotionalState.anger);
    if (max === emotionalState.joy) return 'hopeful';
    if (max === emotionalState.fear) return 'anxious';
    if (max === emotionalState.sadness) return 'melancholic';
    if (max === emotionalState.anger) return 'intense';
    return 'neutral';
  }

  getRecentDreams(count = 5) {
    return this.dreams.slice(-count);
  }
}

module.exports = DreamNarrator;

// Demo
if (require.main === module) {
  const narrator = new DreamNarrator();
  
  console.log('💭 Dream Narrator Demo\n');
  
  // Generate a dream
  const dream = narrator.generateDream(
    { joy: 0.7, fear: 0.2, sadness: 0.1, anger: 0.0 },
    ['memories']
  );
  
  console.log('Dream:', dream.narrative);
  console.log('Theme:', dream.theme);
  console.log('\nInterpretation:');
  console.log(JSON.stringify(narrator.interpret(dream), null, 2));
}
