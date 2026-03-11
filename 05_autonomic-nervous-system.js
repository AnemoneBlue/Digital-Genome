/**
 * 🌿 Autonomic Nervous System
 * Parasympathetic and sympathetic divisions
 */

class AutonomicNervousSystem {
  constructor() {
    this.sympathetic = this.initializeSympathetic();
    this.parasympathetic = this.initializeParasympathetic();
    this.state = 'resting'; // or 'stressed'
    this.balance = 0.7; // 0 = parasympathetic, 1 = sympathetic
  }

  initializeSympathetic() {
    return {
      name: 'Sympathetic (Fight or Flight)',
      origin: 'T1-L2 spinal cord',
      neurotransmitters: ['norepinephrine', 'adrenaline'],
      effects: {
        heart: { rate: 'increase', force: 'increase', vessels: 'dilate skeletal' },
        lungs: { bronchioles: 'dilate' },
        eyes: { pupils: 'dilate' },
        skin: { sweat: 'increase', vessels: 'constrict' },
        digestive: { motility: 'decrease', sphincters: 'contract' },
        liver: { glucose: 'release' },
        adrenal: { medulla: 'stimulate' },
        bladder: { wall: 'relax', sphincter: 'contract' }
      }
    };
  }

  initializeParasympathetic() {
    return {
      name: 'Parasympathetic (Rest and Digest)',
      origin: 'brainstem + S2-S4 spinal cord',
      neurotransmitters: ['acetylcholine'],
      effects: {
        heart: { rate: 'decrease', force: 'normal', vessels: 'constrict' },
        lungs: { bronchioles: 'constrict' },
        eyes: { pupils: 'constrict' },
        skin: { sweat: 'normal', vessels: 'dilate' },
        digestive: { motility: 'increase', sphincters: 'relax' },
        liver: { glucose: 'store' },
        adrenal: { medulla: 'inhibit' },
        bladder: { wall: 'contract', sphincter: 'relax' }
      }
    };
  }

  // Activate sympathetic
  activateSympathetic(intensity = 1.0) {
    this.state = 'stressed';
    this.balance = Math.min(1, this.balance + (0.2 * intensity));

    return {
      system: 'sympathetic',
      intensity,
      heartRate: 72 + (30 * intensity * this.balance),
      bloodPressure: 120 + (20 * intensity * this.balance),
      pupils: 'dilated',
      digestion: 'inhibited',
      energy: 'mobilized'
    };
  }

  // Activate parasympathetic
  activateParasympathetic(intensity = 1.0) {
    this.state = 'resting';
    this.balance = Math.max(0, this.balance - (0.2 * intensity));

    return {
      system: 'parasympathetic',
      intensity,
      heartRate: 72 - (15 * intensity * (1 - this.balance)),
      bloodPressure: 120 - (10 * intensity * (1 - this.balance)),
      pupils: 'constricted',
      digestion: 'active',
      energy: 'stored'
    };
  }

  // Baroreceptor reflex
  baroreceptorReflex(bloodPressure) {
    if (bloodPressure > 140) {
      return this.activateParasympathetic(0.5);
    } else if (bloodPressure < 90) {
      return this.activateSympathetic(0.5);
    }
    return { reflex: 'no action needed', bp: bloodPressure };
  }

  // Vagus nerve stimulation
  vagalTone() {
    const vagalToneIndex = (1 - this.balance) * 100;
    return {
      vagalTone: vagalToneIndex,
      heartRateVariability: vagalToneIndex * 2,
      stressResilience: vagalToneIndex > 50 ? 'high' : 'low',
      recommendation: vagalToneIndex < 30 ? 'increase vagal tone' : 'optimal'
    };
  }

  // Homeostasis regulation
  regulateHomeostasis() {
    const currentBalance = this.balance;
    const targetBalance = 0.3; // resting state

    if (currentBalance > targetBalance + 0.1) {
      return this.activateParasympathetic(0.1);
    } else if (currentBalance < targetBalance - 0.1) {
      return this.activateSympathetic(0.1);
    }

    return { status: 'homeostasis achieved', balance: currentBalance };
  }

  getState() {
    return {
      system: this.state === 'stressed' ? 'sympathetic' : 'parasympathetic',
      balance: this.balance,
      heartRate: 72 + (30 * this.balance),
      bloodPressure: 120 + (20 * this.balance)
    };
  }
}

module.exports = new AutonomicNervousSystem();
