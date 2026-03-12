/**
 * Genome Digital - Sensorimotor Loop
 * Closed loop: Sensory → Brain → Motor → Body → Sensory
 * Added: 12 Mar 2026
 */

class SensorimotorLoop {
  constructor() {
    this.sensoryInput = null;
    this.motorOutput = null;
    this.bodyState = null;
    this.loopActive = false;
  }

  // Start the sensorimotor loop
  startLoop() {
    this.loopActive = true;
    return { loopActive: true, status: 'running' };
  }

  // Stop the loop
  stopLoop() {
    this.loopActive = false;
    return { loopActive: false, status: 'stopped' };
  }

  // Process sensory input through brain to motor output
  process(input) {
    this.sensoryInput = input;
    
    // Neural processing happens here
    const processed = this.brainProcessing(input);
    
    // Generate motor command
    this.motorOutput = this.generateMotorCommand(processed);
    
    return {
      input,
      processed,
      motorOutput: this.motorOutput
    };
  }

  // Brain processing simulation
  brainProcessing(input) {
    return {
      input,
      neuralActivity: 'pattern_matched',
      behavior: this.determineBehavior(input)
    };
  }

  // Determine what behavior to produce
  determineBehavior(input) {
    const behaviors = [
      'walk_forward', 'turn_left', 'turn_right',
      'fly_up', 'fly_down', 'stop', 'explore'
    ];
    return behaviors[Math.floor(Math.random() * behaviors.length)];
  }

  // Generate motor command
  generateMotorCommand(processed) {
    return {
      command: processed.behavior,
      intensity: Math.random(),
      duration: Math.random() * 1000
    };
  }

  // Update body state based on motor output
  updateBody(motorOutput) {
    this.bodyState = {
      position: { x: 0, y: 0, z: 0 },
      velocity: motorOutput.intensity,
      orientation: motorOutput.command
    };
    
    return this.bodyState;
  }

  // Complete loop - body produces new sensory input
  completeLoop() {
    if (!this.loopActive) return { error: 'Loop not active' };
    
    // Body movement produces new sensory input
    const newInput = {
      visual: Math.random(),
      auditory: Math.random(),
      proprioceptive: this.bodyState ? this.bodyState.velocity : 0
    };
    
    return {
      loopComplete: true,
      newSensoryInput: newInput,
      readyForNextCycle: true
    };
  }

  getStatus() {
    return {
      loopActive: this.loopActive,
      hasInput: this.sensoryInput !== null,
      hasOutput: this.motorOutput !== null,
      hasBodyState: this.bodyState !== null
    };
  }
}

module.exports = SensorimotorLoop;
