/**
 * 😊 Emotional Processing System
 * Emotion detection and processing
 */

class EmotionalProcessingSystem {
  constructor() {
    this.emotions = this.initializeEmotions();
    this.currentState = this.createDefaultState();
    this.emotionHistory = [];
  }

  initializeEmotions() {
    return {
      joy: { 
        valence: 1, arousal: 0.5, dominance: 0.8,
        neuralBasis: ['ventral striatum', 'left prefrontal'],
        expression: 'smile'
      },
      sadness: { 
        valence: -0.8, arousal: -0.3, dominance: 0.4,
        neuralBasis: ['right prefrontal', 'amygdala'],
        expression: 'frown'
      },
      anger: { 
        valence: -0.9, arousal: 0.9, dominance: 0.7,
        neuralBasis: ['amygdala', 'insular cortex'],
        expression: 'grimace'
      },
      fear: { 
        valence: -0.8, arousal: 0.8, dominance: 0.3,
        neuralBasis: ['amygdala', 'hippocampus'],
        expression: 'wide eyes'
      },
      surprise: { 
        valence: 0.2, arousal: 0.7, dominance: 0.5,
        neuralBasis: ['amygdala', 'superior temporal'],
        expression: 'raised eyebrows'
      },
      disgust: { 
        valence: -0.7, arousal: 0.3, dominance: 0.6,
        neuralBasis: ['insular cortex', 'basal ganglia'],
        expression: 'nose wrinkle'
      },
      contempt: { 
        valence: -0.6, arousal: 0.2, dominance: 0.7,
        neuralBasis: ['right prefrontal'],
        expression: 'unilateral smile'
      },
      anticipation: { 
        valence: 0.3, arousal: 0.5, dominance: 0.6,
        neuralBasis: ['caudate nucleus', 'putamen'],
        expression: 'lean forward'
      },
      trust: { 
        valence: 0.6, arousal: 0.2, dominance: 0.7,
        neuralBasis: ['ventral striatum'],
        expression: 'open posture'
      },
      hope: { 
        valence: 0.5, arousal: 0.4, dominance: 0.5,
        neuralBasis: ['left prefrontal', 'caudate'],
        expression: 'slight smile'
      }
    };
  }

  createDefaultState() {
    return {
      primary: 'neutral',
      intensity: 0,
      valence: 0,
      arousal: 0,
      dominance: 0,
      blend: {}
    };
  }

  // Process emotion from stimulus
  processEmotion(stimulus, emotion = 'joy') {
    const emotionData = this.emotions[emotion];
    if (!emotionData) return null;

    const processed = {
      stimulus,
      emotion,
      intensity: Math.min(1, 0.5 + Math.random() * 0.5),
      valence: emotionData.valence,
      arousal: emotionData.arousal,
      dominance: emotionData.dominance,
      expression: emotionData.expression,
      neuralBasis: emotionData.neuralBasis,
      timestamp: Date.now()
    };

    this.currentState = {
      primary: emotion,
      intensity: processed.intensity,
      valence: processed.valence,
      arousal: processed.arousal,
      dominance: processed.dominance,
      blend: this.calculateBlend(processed)
    };

    this.emotionHistory.push(processed);
    if (this.emotionHistory.length > 100) this.emotionHistory.shift();

    return processed;
  }

  // Emotional blending (complex emotions)
  calculateBlend(emotion) {
    const blends = {
      'joy+anticipation': 'optimism',
      'joy+trust': 'love',
      'fear+surprise': 'awe',
      'sadness+surprise': 'despair',
      'anger+disgust': 'contempt',
      'joy+sadness': 'bittersweet',
      'fear+anger': 'frustration'
    };

    return blends[emotion.emotion] || null;
  }

  // Emotion regulation
  regulate(strategy = 'reappraisal') {
    const strategies = {
      suppression: { effect: -0.3, type: 'expressive' },
      reappraisal: { effect: 0.2, type: 'cognitive' },
      acceptance: { effect: 0.1, type: 'mindful' },
      distraction: { effect: -0.2, type: 'attentional' },
      rumination: { effect: 0.3, type: 'maladaptive' }
    };

    const strategyData = strategies[strategy];
    this.currentState.intensity *= (1 + strategyData.effect);

    return {
      strategy,
      effect: strategyData.effect,
      newIntensity: this.currentState.intensity
    };
  }

  // Empathy simulation
  empathize(observedEmotion) {
    return {
      mirroredEmotion: observedEmotion,
      mirrorNeurons: true,
      emotionalContagion: true,
      perspectiveTaking: true,
      empathicAccuracy: 0.7
    };
  }

  // Mood vs Emotion (longer lasting vs brief)
  getMood() {
    if (this.emotionHistory.length < 10) return 'neutral';

    const recent = this.emotionHistory.slice(-10);
    const avgValence = recent.reduce((a, e) => a + e.valence, 0) / recent.length;
    const avgArousal = recent.reduce((a, e) => a + e.arousal, 0) / recent.length;

    if (avgValence > 0.5 && avgArousal > 0.3) return 'happy';
    if (avgValence < -0.5) return 'sad';
    if (avgArousal > 0.6) return 'stressed';
    if (avgArousal < -0.3) return 'calm';

    return 'neutral';
  }

  getCurrentState() {
    return this.currentState;
  }

  getEmotionHistory() {
    return this.emotionHistory;
  }
}

module.exports = new EmotionalProcessingSystem();
