/**
 * Genome Digital - Emotional Intelligence
 * Recognizing, understanding, managing emotions
 * Added: 11 Mar 2026
 */

class EmotionalIntelligence {
  constructor() {
    this.emotions = new Map();
    this.emotionalHistory = [];
    this.intelligence = 0.7;
  }

  recognizeEmotion(expression) {
    const emotions = {
      joy: { valence: 0.9, arousal: 0.7 },
      sadness: { valence: -0.8, arousal: 0.3 },
      anger: { valence: -0.7, arousal: 0.9 },
      fear: { valence: -0.6, arousal: 0.8 },
      surprise: { valence: 0.3, arousal: 0.9 },
      disgust: { valence: -0.5, arousal: 0.5 },
      trust: { valence: 0.7, arousal: 0.4 },
      anticipation: { valence: 0.5, arousal: 0.7 }
    };
    
    const recognized = Object.keys(emotions)[Math.floor(Math.random() * 8)];
    this.emotions.set(recognized, emotions[recognized]);
    
    return { recognized, ...emotions[recognized] };
  }

  understandEmotion(emotion) {
    return {
      emotion,
      cause: 'inferred',
      duration: 'temporary',
      expression: this.getExpression(emotion)
    };
  }

  getExpression(emotion) {
    const expressions = {
      joy: 'smile',
      sadness: 'frown',
      anger: 'grimace',
      fear: 'wide eyes',
      surprise: 'raised eyebrows'
    };
    return expressions[emotion] || 'neutral';
  }

  manageEmotion(emotion, strategy) {
    const strategies = {
      reappraisal: 'reinterpret the situation',
      suppression: 'inhibit expression',
      acceptance: 'allow the emotion',
      regulation: 'modulate intensity'
    };
    
    return {
      emotion,
      strategy: strategies[strategy] || 'accept',
      managed: true
    };
  }

  expressEmotion(emotion) {
    const expression = {
      emotion,
      expression: this.getExpression(emotion),
      timestamp: Date.now()
    };
    
    this.emotionalHistory.push(expression);
    return expression;
  }

  getEmotionalState() {
    return {
      current: this.emotions,
      history: this.emotionalHistory.slice(-10),
      intelligence: this.intelligence
    };
  }
}

module.exports = EmotionalIntelligence;
