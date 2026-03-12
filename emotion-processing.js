/**
 * Genome Digital - Emotion Processing Module
 * Processes and generates emotional responses
 * Added: 12 Mar 2026
 */

class EmotionProcessing {
  constructor() {
    this.currentEmotion = 'neutral';
    this.emotionIntensity = 0;
    this.emotionalState = {
      joy: 0,
      sadness: 0,
      anger: 0,
      fear: 0,
      surprise: 0,
      disgust: 0,
      trust: 0,
      anticipation: 0
    };
    this.emotionHistory = [];
  }

  // Process emotional response to stimulus
  processEmotion(stimulus) {
    let emotion = 'neutral';
    let intensity = 0;

    if (stimulus.type === 'reward') {
      emotion = 'joy';
      intensity = stimulus.value;
      this.emotionalState.joy += stimulus.value * 0.3;
    } else if (stimulus.type === 'threat') {
      emotion = 'fear';
      intensity = stimulus.value;
      this.emotionalState.fear += stimulus.value * 0.3;
    } else if (stimulus.type === 'novel') {
      emotion = 'surprise';
      intensity = stimulus.value;
      this.emotionalState.surprise += stimulus.value * 0.3;
    } else if (stimulus.type === 'loss') {
      emotion = 'sadness';
      intensity = stimulus.value;
      this.emotionalState.sadness += stimulus.value * 0.3;
    } else if (stimulus.type === 'social') {
      emotion = 'trust';
      intensity = stimulus.value;
      this.emotionalState.trust += stimulus.value * 0.3;
    }

    // Decay other emotions
    Object.keys(this.emotionalState).forEach(e => {
      if (e !== emotion) {
        this.emotionalState[e] *= 0.9;
      }
    });

    this.currentEmotion = emotion;
    this.emotionIntensity = intensity;

    this.emotionHistory.push({
      emotion,
      intensity,
      stimulus: stimulus.type,
      timestamp: Date.now()
    });

    return {
      emotion,
      intensity,
      state: { ...this.emotionalState }
    };
  }

  // Get current emotional state
  getCurrentEmotion() {
    return {
      emotion: this.currentEmotion,
      intensity: this.emotionIntensity,
      fullState: { ...this.emotionalState }
    };
  }

  // Express emotion (generate expression)
  express() {
    const expressions = {
      joy: { facial: 'smile', vocal: 'happy_tone', body: 'relaxed' },
      sadness: { facial: 'frown', vocal: 'sad_tone', body: 'slumped' },
      anger: { facial: 'grimace', vocal: 'harsh_tone', body: 'tense' },
      fear: { facial: 'wide_eyes', vocal: 'trembling', body: 'frozen' },
      surprise: { facial: 'astonished', vocal: 'exclaimed', body: 'startled' },
      disgust: { facial: 'gagged', vocal: ' repulsed', body: 'recoiled' },
      trust: { facial: 'calm', vocal: 'soothing', body: 'open' },
      anticipation: { facial: 'eager', vocal: 'energetic', body: 'alert' },
      neutral: { facial: 'neutral', vocal: 'monotone', body: 'relaxed' }
    };

    return {
      emotion: this.currentEmotion,
      expression: expressions[this.currentEmotion] || expressions.neutral,
      intensity: this.emotionIntensity
    };
  }

  // Regulate emotion (downregulate intense emotions)
  regulate(targetEmotion = 'neutral', targetIntensity = 0.2) {
    this.emotionIntensity = targetIntensity;
    this.currentEmotion = targetEmotion;
    
    // Reset all emotions to low
    Object.keys(this.emotionalState).forEach(e => {
      this.emotionalState[e] = 0.1;
    });

    return { regulated: true, newEmotion: targetEmotion };
  }

  // Get emotion history
  getHistory() {
    return this.emotionHistory;
  }

  getStatus() {
    return {
      currentEmotion: this.currentEmotion,
      intensity: this.emotionIntensity,
      historyLength: this.emotionHistory.length,
      dominantEmotion: this.getDominantEmotion()
    };
  }

  getDominantEmotion() {
    let max = 0;
    let dominant = 'neutral';
    Object.entries(this.emotionalState).forEach(([e, v]) => {
      if (v > max) {
        max = v;
        dominant = e;
      }
    });
    return dominant;
  }
}

module.exports = EmotionProcessing;
