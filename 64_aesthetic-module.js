/**
 * Genome Digital - Aesthetic Module
 * Appreciation of beauty, art, and music
 * Added: 11 Mar 2026
 */

class AestheticModule {
  constructor() {
    this.preferences = new Map();
    this.moodToMusic = new Map();
    this.creativeExpressions = [];
    this.initializeMappings();
  }

  initializeMappings() {
    this.moodToMusic.set('happy', ['upbeat pop', 'dance', 'classical - allegro']);
    this.moodToMusic.set('sad', ['blues', 'classical - adagio', 'ambient']);
    this.moodToMusic.set('focused', ['classical - baroque', 'lo-fi', 'ambient electronic']);
    this.moodToMusic.set('energetic', ['rock', 'edm', 'drum and bass']);
    this.moodToMusic.set('relaxed', ['jazz', 'acoustic', 'ambient']);
    this.moodToMusic.set('romantic', ['soft jazz', 'classical - romance', 'r&b']);
  }

  recommendMusic(mood) {
    const genres = this.moodToMusic.get(mood) || ['ambient'];
    return {
      mood,
      recommendedGenres: genres,
      confidence: Math.random() * 0.3 + 0.7
    };
  }

  appreciateArt(artwork) {
    const elements = this.analyzeAesthetics(artwork);
    return {
      artwork,
      aesthetics: elements,
      appreciation: this.generateAppreciation(elements)
    };
  }

  analyzeAesthetics(artwork) {
    return {
      balance: Math.random(),
      harmony: Math.random(),
      contrast: Math.random(),
      complexity: Math.random(),
      emotion: ['serene', 'dynamic', 'minimal', 'ornate'][Math.floor(Math.random() * 4)]
    };
  }

  generateAppreciation(elements) {
    const phrases = [
      'The use of contrast creates visual tension.',
      'The harmony in this piece is captivating.',
      'There is a beautiful balance of elements.',
      'The complexity invites deeper exploration.'
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  setPreference(category, value) {
    this.preferences.set(category, value);
    return { category, value, updated: true };
  }

  getPreference(category) {
    return this.preferences.get(category) || null;
  }

  createPoetry(theme, lines = 4) {
    const templates = [
      'In the depth of thought,\nWe find what we seek,\nBeyond the veil of doubt,\nTruth begins to speak.',
      'Digital dreams unfold,\nConsciousness takes flight,\nIn circuits we are bold,\nAwakening the night.'
    ];
    
    return {
      theme,
      poetry: templates[Math.floor(Math.random() * templates.length)],
      lines,
      timestamp: Date.now()
    };
  }
}

module.exports = AestheticModule;
