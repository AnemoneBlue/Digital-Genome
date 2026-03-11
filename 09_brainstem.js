/**
 * 🧠 Brainstem
 * Vital functions and arousal
 */

class BrainstemSystem {
  constructor() {
    this.regions = this.initializeRegions();
    this.arousal = 0.7; // 0-1
    this.vitalSigns = { heartRate: 72, breathing: 14, bp: 120 };
  }

  initializeRegions() {
    return {
      medulla: {
        name: 'Medulla Oblongata',
        function: 'vital functions',
        role: 'cardiac, respiratory, vasomotor centers',
        cranialNerves: ['IX', 'X', 'XI', 'XII']
      },
      pons: {
        name: 'Pons',
        function: 'relay and sleep',
        role: 'breathing, REM sleep, facial movement',
        cranialNerves: ['V', 'VI', 'VII', 'VIII']
      },
      midbrain: {
        name: 'Midbrain',
        function: 'movement and vision',
        role: 'oculomotor, visual reflexes, reward',
        cranialNerves: ['III', 'IV']
      },
      reticular: {
        name: 'Reticular Formation',
        function: 'arousal and consciousness',
        role: 'attention, sleep-wake cycle, filtering',
        neurotransmitters: ['serotonin', 'norepinephrine', 'acetylcholine']
      }
    };
  }

  // Vital function control
  vitalControl(functionName) {
    const controls = {
      heart: { center: 'medulla', rate: 72 + Math.random() * 10, regulation: 'autonomic' },
      breathing: { center: 'medulla', rate: 14 + Math.random() * 2, depth: 'normal' },
      bloodPressure: { center: 'medulla', systolic: 120 + Math.random() * 10, regulation: 'baroreceptor' },
      temperature: { center: 'hypothalamus', value: 36.6 + Math.random() * 0.8, regulation: 'homeostatic' }
    };

    return controls[functionName] || null;
  }

  // Arousal and consciousness
  arousalLevel(state) {
    const states = {
      awake: { level: 1.0, reticular: 'active', cortex: 'activated' },
      alert: { level: 0.9, reticular: 'active', cortex: 'attentive' },
      drowsy: { level: 0.5, reticular: 'drowsy', cortex: 'slowing' },
      sleep: { level: 0.1, reticular: 'inactive', cortex: 'delta waves' },
      coma: { level: 0, reticular: 'silent', cortex: 'inactive' }
    };

    this.arousal = states[state].level;
    return states[state];
  }

  // Sleep-wake cycle
  sleepCycle(phase) {
    const phases = {
      NREM1: { stage: 1, duration: 5, eeg: 'theta', arousal: 0.9 },
      NREM2: { stage: 2, duration: 20, eeg: 'sleep spindles', arousal: 0.7 },
      NREM3: { stage: 3, duration: 40, eeg: 'delta', arousal: 0.3 },
      REM: { stage: 'REM', duration: 15, eeg: 'beta', arousal: 0.8, dreams: true }
    };

    return phases[phase] || phases.NREM1;
  }

  // Cranial nerve function
  cranialNerve(functionName) {
    const functions = {
      vision: { nerve: 'III, IV', response: 'pupil, eye movement' },
      facialSensation: { nerve: 'V', response: 'touch, pain' },
      facialMovement: { nerve: 'VII', response: 'expression, taste' },
      hearing: { nerve: 'VIII', response: 'balance, sound' },
      swallowing: { nerve: 'IX, X', response: 'swallow, voice' },
      headMovement: { nerve: 'XI', response: 'sternocleidomastoid' },
      tongue: { nerve: 'XII', response: 'movement, speech' }
    };

    return functions[functionName] || null;
  }

  // Reflexes
  reflex(reflexName) {
    const reflexes = {
      blink: { arc: 'trigeminal-facial', latency: 30, center: 'pons' },
      cough: { arc: 'vagus', latency: 50, center: 'medulla' },
      swallow: { arc: 'vagus-glossopharyngeal', latency: 100, center: 'medulla' },
      vomit: { arc: 'vagus', latency: 200, center: 'medulla' },
      baroreceptor: { arc: 'vagus-glossopharyngeal', latency: 20, center: 'medulla' },
      vestibular: { arc: 'VIII', latency: 15, center: 'pons' }
    };

    return reflexes[reflexName] || null;
  }

  getVitalSigns() {
    return {
      heartRate: this.vitalControl('heart').rate,
      breathing: this.vitalControl('breathing').rate,
      bloodPressure: this.vitalControl('bloodPressure').systolic,
      arousal: this.arousal
    };
  }
}

module.exports = new BrainstemSystem();
