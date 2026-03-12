/**
 * Genome Digital - Virtual Body Interface
 * Connects brain to virtual body in simulation
 * Added: 12 Mar 2026
 */

class VirtualBodyInterface {
  constructor() {
    this.bodyType = 'fly'; // fly, mouse, human
    this.body = null;
    this.connected = false;
    this.sensors = {};
    this.motors = {};
  }

  // Create virtual body
  createBody(type = 'fly') {
    this.bodyType = type;
    
    if (type === 'fly') {
      this.body = {
        type: 'fly',
        parts: {
          wings: 2,
          legs: 6,
          eyes: 2,
          antennae: 2
        },
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        orientation: { pitch: 0, yaw: 0, roll: 0 }
      };
    } else if (type === 'mouse') {
      this.body = {
        type: 'mouse',
        parts: { legs: 4, ears: 2, eyes: 2, whiskers: 20 },
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 }
      };
    }
    
    this.initializeSensors();
    this.initializeMotors();
    
    return { bodyCreated: true, type: this.bodyType };
  }

  // Initialize sensors
  initializeSensors() {
    this.sensors = {
      visual: { active: true, data: null },
      auditory: { active: true, data: null },
      proprioceptive: { active: true, data: null },
      vestibular: { active: true, data: null },
      tactile: { active: true, data: null }
    };
  }

  // Initialize motors
  initializeMotors() {
    this.motors = {
      left_wing: { active: false, speed: 0 },
      right_wing: { active: false, speed: 0 },
      left_leg: { active: false, position: 0 },
      right_leg: { active: false, position: 0 },
      head: { active: false, angle: 0 }
    };
  }

  // Connect brain to body
  connect() {
    this.connected = true;
    return { connected: true, bodyType: this.bodyType };
  }

  // Disconnect brain from body
  disconnect() {
    this.connected = false;
    return { connected: false };
  }

  // Get sensory data from body
  getSensoryData() {
    if (!this.body) return { error: 'No body created' };
    
    return {
      visual: { 
        left_eye: Math.random(), 
        right_eye: Math.random() 
      },
      vestibular: {
        pitch: (Math.random() - 0.5) * 0.1,
        yaw: (Math.random() - 0.5) * 0.1
      },
      proprioceptive: {
        leg_positions: [0, 0, 0, 0, 0, 0]
      }
    };
  }

  // Send motor commands to body
  sendMotorCommand(command) {
    if (!this.connected) return { error: 'Not connected' };
    
    // Apply command to motors
    if (command.includes('left')) {
      this.motors.left_wing.active = true;
      this.motors.left_wing.speed = command.intensity || 0.5;
    }
    if (command.includes('right')) {
      this.motors.right_wing.active = true;
      this.motors.right_wing.speed = command.intensity || 0.5;
    }
    
    // Update body position based on motor commands
    this.updateBodyPosition(command);
    
    return { commandApplied: command, motors: this.motors };
  }

  // Update body position
  updateBodyPosition(command) {
    const speed = command.intensity || 0.5;
    const direction = command.direction || 'forward';
    
    if (direction === 'forward') {
      this.body.position.x += speed;
    } else if (direction === 'backward') {
      this.body.position.x -= speed;
    }
    
    this.body.velocity.x = speed;
  }

  // Get body state
  getBodyState() {
    return this.body;
  }

  // Get status
  getStatus() {
    return {
      bodyType: this.bodyType,
      connected: this.connected,
      hasBody: this.body !== null,
      sensors: Object.keys(this.sensors),
      motors: Object.keys(this.motors)
    };
  }
}

module.exports = VirtualBodyInterface;
