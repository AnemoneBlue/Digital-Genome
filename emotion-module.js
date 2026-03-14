/**
 * ================================================================================
 * GENOME DIGITAL - EMOTION MODULE v2.0
 * ================================================================================
 * Comprehensive emotional processing system with mood, personality, and regulation
 * ================================================================================
 */

class EmotionModule {
  constructor(options = {}) {
    // Core emotional state
    this.primaryEmotions = {
      joy: 0,
      sadness: 0,
      anger: 0,
      fear: 0,
      surprise: 0,
      disgust: 0,
      trust: 0,
      anticipation: 0
    };
    
    // Mood (longer-term emotional baseline)
    this.mood = {
      valence: 0,      // -1 (negative) to +1 (positive)
      arousal: 0,      // -1 (calm) to +1 (excited)
      dominance: 0    // -1 (submissive) to +1 (dominant)
    };
    
    // Emotional personality traits
    this.personality = {
      baselineValence: options.baselineValence || 0.2,  // Generally positive/negative
      baselineArousal: options.baselineArousal || 0.1,
      emotionalVolatility: options.emotionalVolatility || 0.3,  // How much emotions swing
      empathy: options.empathy || 0.5,
      resilience: options.resilience || 0.6  // How fast recover from negative emotions
    };
    
    // Current state
    this.currentEmotion = 'neutral';
    this.intensity = 0;
    this.emotionalHistory = [];
    this.triggerHistory = [];
    
    // Affective computing values
    this.pleasure = 0;
    this.arousal = 0;
    this.dominance = 0;
    
    // Regulation strategies
    this.regulationStrategies = ['reappraisal', 'suppression', 'expression', 'mindfulness'];
    this.usedStrategies = [];
  }

  // ============================================================================
  // EMOTION DETECTION - Detect emotion from stimulus
  // ============================================================================
  
  detectEmotion(stimulus) {
    let emotion = 'neutral';
    let intensity = 0;
    let triggers = [];
    
    // Analyze stimulus type
    if (stimulus.type === 'reward' || stimulus.type === 'pleasure') {
      emotion = 'joy';
      intensity = stimulus.value || 0.5;
      triggers.push('positive_outcome');
    }
    else if (stimulus.type === 'threat' || stimulus.type === 'danger') {
      emotion = 'fear';
      intensity = stimulus.value || 0.7;
      triggers.push('danger_detected');
    }
    else if (stimulus.type === 'loss' || stimulus.type === 'failure') {
      emotion = 'sadness';
      intensity = stimulus.value || 0.6;
      triggers.push('negative_outcome');
    }
    else if (stimulus.type === 'novelty' || stimulus.type === 'unexpected') {
      emotion = 'surprise';
      intensity = stimulus.value || 0.5;
      triggers.push('unexpected_event');
    }
    else if (stimulus.type === 'injustice' || stimulus.type === 'offense') {
      emotion = 'anger';
      intensity = stimulus.value || 0.6;
      triggers.push('violation');
    }
    else if (stimulus.type === 'social' || stimulus.type === 'bonding') {
      emotion = 'trust';
      intensity = stimulus.value || 0.4;
      triggers.push('social_connection');
    }
    else if (stimulus.type === 'anticipation' || stimulus.type === 'goal') {
      emotion = 'anticipation';
      intensity = stimulus.value || 0.5;
      triggers.push('goal_oriented');
    }
    else if (stimulus.type === 'repulsion' || stimulus.type === 'toxic') {
      emotion = 'disgust';
      intensity = stimulus.value || 0.6;
      triggers.push('aversive_stimulus');
    }
    
    // Consider empathy
    if (stimulus.emotional && this.personality.empathy > 0.3) {
      // Mirror the emotion
      intensity = intensity * (1 + this.personality.empathy);
    }
    
    // Apply personality influence
    intensity = intensity * (1 + this.personality.emotionalVolatility * (Math.random() - 0.5));
    
    // Clamp intensity
    intensity = Math.max(0, Math.min(1, intensity));
    
    return {
      emotion,
      intensity,
      triggers,
      source: stimulus.source || 'unknown'
    };
  }

  // ============================================================================
  // EMOTION PROCESSING - Process and update emotional state
  // ============================================================================
  
  process(stimulus) {
    // Detect emotion
    const detected = this.detectEmotion(stimulus);
    
    // Update primary emotions
    this.primaryEmotions[detected.emotion] = Math.max(
      this.primaryEmotions[detected.emotion],
      detected.intensity
    );
    
    // Decay other emotions
    Object.keys(this.primaryEmotions).forEach(emotion => {
      if (emotion !== detected.emotion) {
        this.primaryEmotions[emotion] *= (1 - 0.1 * this.personality.resilience);
      }
    });
    
    // Determine dominant emotion
    this.currentEmotion = this.getDominantEmotion();
    this.intensity = detected.intensity;
    
    // Update PAD values
    this.updatePAD(stimulus, detected);
    
    // Record in history
    this.emotionalHistory.push({
      stimulus: stimulus.type,
      emotion: detected.emotion,
      intensity: detected.intensity,
      mood: { ...this.mood },
      timestamp: Date.now()
    });
    
    // Record trigger
    this.triggerHistory.push({
      ...detected,
      timestamp: Date.now()
    });
    
    return {
      emotion: detected.emotion,
      intensity: detected.intensity,
      mood: { ...this.mood },
      primaryEmotions: { ...this.primaryEmotions }
    };
  }
  
  updatePAD(stimulus, detected) {
    // Map emotion to PAD
    const padMapping = {
      joy: { v: 0.8, a: 0.3, d: 0.4 },
      sadness: { v: -0.7, a: -0.3, d: -0.5 },
      anger: { v: -0.5, a: 0.7, d: 0.6 },
      fear: { v: -0.6, a: 0.6, d: -0.7 },
      surprise: { v: 0.2, a: 0.7, d: -0.1 },
      disgust: { v: -0.6, a: 0.3, d: -0.4 },
      trust: { v: 0.6, a: 0.1, d: 0.3 },
      anticipation: { v: 0.5, a: 0.4, d: 0.2 },
      neutral: { v: 0, a: 0, d: 0 }
    };
    
    const mapping = padMapping[detected.emotion] || padMapping.neutral;
    
    // Apply emotion to mood
    this.mood.valence += mapping.v * detected.intensity * 0.3;
    this.mood.arousal += mapping.a * detected.intensity * 0.3;
    this.mood.dominance += mapping.d * detected.intensity * 0.3;
    
    // Personality influence on mood
    this.mood.valence += (this.personality.baselineValence - this.mood.valence) * 0.1;
    this.mood.arousal += (this.personality.baselineArousal - this.mood.arousal) * 0.1;
    
    // Clamp values
    this.mood.valence = Math.max(-1, Math.min(1, this.mood.valence));
    this.mood.arousal = Math.max(-1, Math.min(1, this.mood.arousal));
    this.mood.dominance = Math.max(-1, Math.min(1, this.mood.dominance));
    
    // Update PAD
    this.pleasure = this.mood.valence;
    this.arousal = this.mood.arousal;
    this.dominance = this.mood.dominance;
  }

  // ============================================================================
  // EMOTION REGULATION - Manage emotional responses
  // ============================================================================
  
  regulate(strategy = 'reappraisal', target = null) {
    const validStrategies = ['reappraisal', 'suppression', 'expression', 'mindfulness', 'distraction', 'acceptance'];
    
    if (!validStrategies.includes(strategy)) {
      return { error: 'Invalid strategy' };
    }
    
    let regulation = {
      strategy,
      timestamp: Date.now()
    };
    
    switch(strategy) {
      case 'reappraisal':
        // Change interpretation of situation
        regulation.effect = this.reappraise();
        break;
      case 'suppression':
        // Hide emotion
        regulation.effect = this.suppress();
        break;
      case 'expression':
        // Express emotion
        regulation.effect = this.express();
        break;
      case 'mindfulness':
        // Observe without judgment
        regulation.effect = this.mindfulness();
        break;
      case 'distraction':
        // Shift attention
        regulation.effect = this.distract();
        break;
      case 'acceptance':
        // Accept current emotion
        regulation.effect = this.accept();
        break;
    }
    
    this.usedStrategies.push(regulation);
    
    return {
      regulated: true,
      ...regulation
    };
  }
  
  reappraise() {
    // Reinterpret in more positive light
    this.mood.valence += 0.2;
    this.intensity *= 0.7;
    return { reappraised: true, newValence: this.mood.valence };
  }
  
  suppress() {
    // Reduce expression but not internal feeling
    const suppressed = this.intensity;
    this.intensity *= 0.5;
    return { suppressed, warning: 'Can lead to stress' };
  }
  
  express() {
    // Allow full expression
    return { expressed: true, emotion: this.currentEmotion };
  }
  
  mindfulness() {
    // Non-judgmental awareness
    return { mindful: true, observe: 'I notice I feel ' + this.currentEmotion };
  }
  
  distract() {
    // Shift focus
    this.intensity *= 0.6;
    this.mood.arousal *= 0.8;
    return { distracted: true };
  }
  
  accept() {
    // Allow emotion to be
    return { accepted: true, emotion: this.currentEmotion };
  }

  // ============================================================================
  // MOOD MANAGEMENT
  // ============================================================================
  
  getMood() {
    return { ...this.mood };
  }
  
  setMood(valence, arousal, dominance = 0) {
    this.mood.valence = Math.max(-1, Math.min(1, valence));
    this.mood.arousal = Math.max(-1, Math.min(1, arousal));
    this.mood.dominance = Math.max(-1, Math.min(1, dominance));
    return { mood: { ...this.mood } };
  }
  
  // Natural mood decay toward baseline
  decay() {
    const decayRate = 0.05 * this.personality.resilience;
    
    // Return toward baseline
    this.mood.valence += (this.personality.baselineValence - this.mood.valence) * decayRate;
    this.mood.arousal += (this.personality.baselineArousal - this.mood.arousal) * decayRate;
    this.mood.dominance *= (1 - decayRate);
    
    // Decay primary emotions
    Object.keys(this.primaryEmotions).forEach(emotion => {
      this.primaryEmotions[emotion] *= (1 - decayRate);
    });
    
    // Update current emotion
    this.currentEmotion = this.getDominantEmotion();
    this.intensity = this.primaryEmotions[this.currentEmotion];
  }

  // ============================================================================
  // EXPRESSION GENERATION
  // ============================================================================
  
  express(emotion = null) {
    const targetEmotion = emotion || this.currentEmotion;
    
    const expressions = {
      joy: {
        facial: 'smile',
        vocal: 'cheerful',
        body: 'relaxed, open posture',
        physiological: 'increased heart rate variability'
      },
      sadness: {
        facial: 'frown, drooping eyes',
        vocal: 'monotone, slow',
        body: 'slumped, slow movement',
        physiological: 'lower heart rate'
      },
      anger: {
        facial: 'tight jaw, narrowed eyes',
        vocal: 'loud, harsh',
        body: 'tense, forward lean',
        physiological: 'increased heart rate, blood pressure'
      },
      fear: {
        facial: 'wide eyes, open mouth',
        vocal: 'trembling, high pitch',
        body: 'frozen, tense',
        physiological: 'rapid breathing, Galvanic skin response'
      },
      surprise: {
        facial: 'raised eyebrows, open mouth',
        vocal: 'exclaimed',
        body: 'startled, jumped',
        physiological: 'brief heart rate increase'
      },
      disgust: {
        facial: 'wrinkled nose',
        vocal: 'retched',
        body: 'recoiled',
        physiological: 'nausea'
      },
      trust: {
        facial: 'relaxed, warm',
        vocal: 'soothing',
        body: 'approachable',
        physiological: 'oxytocin release'
      },
      anticipation: {
        facial: 'eager',
        vocal: 'energetic',
        body: 'alert, leaning forward',
        physiological: 'mild arousal'
      },
      neutral: {
        facial: 'relaxed',
        vocal: 'neutral',
        body: 'natural',
        physiological: 'baseline'
      }
    };
    
    return {
      emotion: targetEmotion,
      expression: expressions[targetEmotion] || expressions.neutral,
      intensity: emotion ? 0.5 : this.intensity
    };
  }

  // ============================================================================
  // SOCIAL EMOTIONS - Empathy and interpersonal
  // ============================================================================
  
  empathize(otherEmotion, otherIntensity) {
    // Mirror other's emotion (empathy)
    const empathized = this.process({
      type: 'empathy',
      value: otherIntensity * this.personality.empathy,
      emotional: true
    });
    
    return {
      empathized: true,
      myEmotion: this.currentEmotion,
      mirroring: otherEmotion
    };
  }
  
  feelFor(other, emotion, intensity) {
    // Feel emotion for someone else (sympathy)
    const sympathetic = this.process({
      type: 'sympathy',
      value: intensity * this.personality.empathy,
      source: 'social'
    });
    
    return sympathetic;
  }

  // ============================================================================
  // GETTERS
  // ============================================================================
  
  getDominantEmotion() {
    let max = 0;
    let dominant = 'neutral';
    
    Object.entries(this.primaryEmotions).forEach(([emotion, value]) => {
      if (value > max) {
        max = value;
        dominant = emotion;
      }
    });
    
    return dominant;
  }
  
  getState() {
    return {
      current: this.currentEmotion,
      intensity: this.intensity,
      mood: { ...this.mood },
      PAD: {
        pleasure: this.pleasure,
        arousal: this.arousal,
        dominance: this.dominance
      },
      primary: { ...this.primaryEmotions }
    };
  }
  
  getHistory(limit = 20) {
    return this.emotionalHistory.slice(-limit);
  }

  // ============================================================================
  // STATUS
  // ============================================================================
  
  getStatus() {
    return {
      currentEmotion: this.currentEmotion,
      intensity: this.intensity,
      mood: {
        valence: this.mood.valence.toFixed(2),
        arousal: this.mood.arousal.toFixed(2),
        dominance: this.mood.dominance.toFixed(2)
      },
      personality: { ...this.personality },
      historyLength: this.emotionalHistory.length,
      dominantEmotion: this.getDominantEmotion()
    };
  }
  
  getPersonality() {
    return { ...this.personality };
  }
  
  setPersonality(traits) {
    Object.assign(this.personality, traits);
    return { personality: { ...this.personality } };
  }
}

// Export
module.exports = EmotionModule;

// Test
if (require.main === module) {
  const emotions = new EmotionModule({
    emotionalVolatility: 0.4,
    empathy: 0.7,
    resilience: 0.5
  });
  
  console.log('=== Emotion Module Test ===\n');
  
  // Process emotions
  console.log('Joy:', emotions.process({ type: 'reward', value: 0.8 }));
  console.log('Fear:', emotions.process({ type: 'threat', value: 0.7 }));
  console.log('Sadness:', emotions.process({ type: 'loss', value: 0.6 }));
  
  // Get state
  console.log('\nCurrent state:');
  console.log(emotions.getState());
  
  // Express
  console.log('\nExpression:');
  console.log(emotions.express());
  
  // Regulate
  console.log('\nAfter regulation:');
  console.log(emotions.regulate('reappraisal'));
  console.log(emotions.getState());
}

module.exports = EmotionModule;
