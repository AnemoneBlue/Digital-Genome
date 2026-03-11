/**
 * 💓 Heartbeat System
 * Cardiac rhythm and circulation
 */

class HeartbeatSystem {
  constructor() {
    this.bpm = 72; // resting heart rate
    this.bloodVolume = 5000; // mL
    this.systolic = 120; // mmHg
    this.diastolic = 80; // mmHg
    this.cardiacOutput = 5; // L/min
    this.rhythm = 'normal';
    this.heartSound = 'lub-dub';
  }

  // Calculate heart rate based on activity
  calculateHR(activityLevel) {
    const maxHR = 220 - 30; // 220 - age
    const targetHR = maxHR * activityLevel;
    return Math.round(targetHR);
  }

  // Heartbeat cycle
  beat() {
    const cycle = {
      phase: 'systole',
      ventricularContraction: true,
      aorticValveOpen: true,
      mitralValveClosed: true,
      bloodEjected: 70, // mL per beat
      duration: 300 // ms
    };
    
    setTimeout(() => {
      cycle.phase = 'diastole';
      cycle.ventricularContraction = false;
      cycle.aorticValveOpen = false;
      cycle.mitralValveClosed = false;
      cycle.bloodEjected = 0;
      cycle.duration = 500;
    }, 300);
    
    return cycle;
  }

  // Cardiac output calculation
  calculateCardiacOutput(heartRate, strokeVolume) {
    return (heartRate * strokeVolume) / 1000; // L/min
  }

  // Blood pressure response
  respondToStress(stressLevel) {
    const hrIncrease = stressLevel * 30;
    const bpIncrease = stressLevel * 20;
    
    return {
      newBPM: this.bpm + hrIncrease,
      newSystolic: this.systolic + bpIncrease,
      newDiastolic: this.diastolic + (bpIncrease * 0.5),
      adrenaline: stressLevel * 100
    };
  }

  // Heart rate variability
  calculateHRV() {
    const hrvValues = [];
    for (let i = 0; i < 10; i++) {
      hrvValues.push(50 + Math.random() * 50); // 50-100ms
    }
    
    const mean = hrvValues.reduce((a, b) => a + b) / hrvValues.length;
    const sd = Math.sqrt(hrvValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / hrvValues.length);
    
    return {
      mean,
      sd,
      stressIndex: 100 / mean,
      parasympathetic: mean > 50
    };
  }

  // Electrocardiogram simulation
  generateECG() {
    return {
      pWave: { duration: 80, amplitude: 0.25 },
      qrsComplex: { duration: 100, amplitude: 1.5 },
      tWave: { duration: 160, amplitude: 0.35 },
      prInterval: 160,
      qtInterval: 400,
      rrInterval: 833 // ~72 bpm
    };
  }

  // Blood distribution
  distributeBlood() {
    return {
      brain: { percentage: 15, volume: 750 },
      heart: { percentage: 5, volume: 250 },
      muscles: { percentage: 20, volume: 1000 },
      digestive: { percentage: 25, volume: 1250 },
      kidneys: { percentage: 20, volume: 1000 },
      skin: { percentage: 10, volume: 500 },
      other: { percentage: 5, volume: 250 }
    };
  }

  // Arrhythmia detection
  checkRhythm() {
    const rhythms = ['normal', 'sinus tachycardia', 'sinus bradycardia', 'atrial fibrillation'];
    return {
      current: this.rhythm,
      isNormal: this.rhythm === 'normal',
      risk: Math.random() * 0.1,
      recommendation: this.rhythm === 'normal' ? 'Continue normal' : 'Medical attention needed'
    };
  }

  getHeartStatus() {
    return {
      bpm: this.bpm,
      bloodVolume: this.bloodVolume,
      pressure: { systolic: this.systolic, diastolic: this.diastolic },
      cardiacOutput: this.cardiacOutput,
      rhythm: this.rhythm,
      hrv: this.calculateHRV()
    };
  }

  // Exercise response
  exerciseResponse(intensity, duration) {
    const hr = this.calculateHR(intensity);
    const co = this.calculateCardiacOutput(hr, 70);
    
    return {
      targetHR: hr,
      actualCO: co,
      bloodFlow: intensity * 100,
      oxygenDelivery: intensity * 1000,
      recovery: duration * 0.1
    };
  }
}

module.exports = new HeartbeatSystem();
