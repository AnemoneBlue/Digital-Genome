/**
 * Genome Digital - Motor Output Module
 * Generates motor commands from neural signals
 * Added: 12 Mar 2026
 */

class MotorOutput {
  constructor() {
    this.motors = {
      left_wing: { active: false, speed: 0, direction: 'neutral' },
      right_wing: { active: false, speed: 0, direction: 'neutral' },
      left_leg: { active: false, position: 0 },
      right_leg: { active: false, position: 0 },
      head: { active: false, angle: 0 },
      body: { active: false, orientation: 0 }
    };
    this.commandHistory = [];
  }

  // Generate motor command from neural signal
  generateCommand(neuralSignal) {
    const command = {
      timestamp: Date.now(),
      intensity: neuralSignal.intensity || 0.5,
      behavior: neuralSignal.behavior || 'idle'
    };

    // Map behavior to motor activation
    if (neuralSignal.behavior === 'walk') {
      command.motors = this.activateWalk();
    } else if (neuralSignal.behavior === 'fly') {
      command.motors = this.activateFly();
    } else if (neuralSignal.behavior === 'turn_left') {
      command.motors = this.activateTurnLeft();
    } else if (neuralSignal.behavior === 'turn_right') {
      command.motors = this.activateTurnRight();
    } else if (neuralSignal.behavior === 'escape') {
      command.motors = this.activateEscape();
    } else {
      command.motors = this.activateIdle();
    }

    this.commandHistory.push(command);
    return command;
  }

  activateWalk() {
    this.motors.left_leg.active = true;
    this.motors.left_leg.position = Math.random();
    this.motors.right_leg.active = true;
    this.motors.right_leg.position = Math.random();
    return { action: 'walk', motors: ['left_leg', 'right_leg'] };
  }

  activateFly() {
    this.motors.left_wing.active = true;
    this.motors.left_wing.speed = 0.8;
    this.motors.right_wing.active = true;
    this.motors.right_wing.speed = 0.8;
    return { action: 'fly', motors: ['left_wing', 'right_wing'] };
  }

  activateTurnLeft() {
    this.motors.left_wing.active = true;
    this.motors.left_wing.speed = 0.3;
    this.motors.right_wing.active = true;
    this.motors.right_wing.speed = 0.8;
    this.motors.head.active = true;
    this.motors.head.angle = -45;
    return { action: 'turn_left', motors: ['left_wing', 'right_wing', 'head'] };
  }

  activateTurnRight() {
    this.motors.left_wing.active = true;
    this.motors.left_wing.speed = 0.8;
    this.motors.right_wing.active = true;
    this.motors.right_wing.speed = 0.3;
    this.motors.head.active = true;
    this.motors.head.angle = 45;
    return { action: 'turn_right', motors: ['left_wing', 'right_wing', 'head'] };
  }

  activateEscape() {
    this.motors.left_wing.active = true;
    this.motors.left_wing.speed = 1.0;
    this.motors.right_wing.active = true;
    this.motors.right_wing.speed = 1.0;
    this.motors.left_leg.active = true;
    this.motors.right_leg.active = true;
    return { action: 'escape', motors: ['left_wing', 'right_wing', 'legs'] };
  }

  activateIdle() {
    Object.keys(this.motors).forEach(m => {
      this.motors[m].active = false;
    });
    return { action: 'idle', motors: [] };
  }

  // Get motor states
  getMotorStates() {
    return this.motors;
  }

  // Get command history
  getHistory() {
    return this.commandHistory;
  }

  getStatus() {
    return {
      activeMotors: Object.values(this.motors).filter(m => m.active).length,
      totalMotors: Object.keys(this.motors).length,
      commandsExecuted: this.commandHistory.length
    };
  }
}

module.exports = MotorOutput;
