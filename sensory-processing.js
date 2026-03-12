/**
 * Genome Digital - Sensory Processing Module
 * Processes sensory input from virtual body
 * Added: 12 Mar 2026
 */

class SensoryProcessing {
  constructor() {
    this.sensors = {
      vision: { active: false, data: null },
      auditory: { active: false, data: null },
      tactile: { active: false, data: null },
      proprioceptive: { active: false, data: null },
      vestibular: { active: false, data: null }
    };
    this.processedData = [];
  }

  // Activate all sensors
  activateAll() {
    Object.keys(this.sensors).forEach(sensor => {
      this.sensors[sensor].active = true;
    });
    return { allSensorsActive: true };
  }

  // Process raw sensory input
  process(rawInput) {
    const processed = {
      timestamp: Date.now(),
      vision: this.processVision(rawInput.vision),
      auditory: this.processAuditory(rawInput.auditory),
      tactile: this.processTactile(rawInput.tactile),
      proprioceptive: this.processProprioceptive(rawInput.proprioceptive),
      vestibular: this.processVestibular(rawInput.vestibular)
    };

    this.processedData.push(processed);
    return processed;
  }

  processVision(data) {
    if (!data) return { detected: false };
    return {
      detected: true,
      objects: Math.floor(Math.random() * 5),
      motion: Math.random(),
      color: 'detected'
    };
  }

  processAuditory(data) {
    if (!data) return { detected: false };
    return {
      detected: true,
      source: 'environment',
      amplitude: Math.random()
    };
  }

  processTactile(data) {
    if (!data) return { detected: false };
    return {
      detected: true,
      pressure: Math.random(),
      location: 'body'
    };
  }

  processProprioceptive(data) {
    return {
      detected: true,
      position: { x: 0, y: 0, z: 0 },
      velocity: Math.random()
    };
  }

  processVestibular(data) {
    return {
      detected: true,
      pitch: Math.random() - 0.5,
      yaw: Math.random() - 0.5,
      roll: Math.random() - 0.5
    };
  }

  // Get processed data
  getProcessedData() {
    return this.processedData;
  }

  getStatus() {
    return {
      sensors: Object.keys(this.sensors),
      activeCount: Object.values(this.sensors).filter(s => s.active).length,
      processedCount: this.processedData.length
    };
  }
}

module.exports = SensoryProcessing;
