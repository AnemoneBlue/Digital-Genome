/**
 * Genome Digital - Brain-Body Integration
 * Complete integration: Brain → Virtual Body → Behaviors
 * Added: 12 Mar 2026
 */

class BrainBodyIntegration {
  constructor() {
    this.brain = null;
    this.body = null;
    this.loop = null;
    this.circuits = null;
    this.running = false;
  }

  // Initialize everything
  initialize(bodyType = 'fly') {
    // Create brain (using our existing genome digital)
    const GenomeDigital = require('./200_genome-digital-finale');
    this.brain = new GenomeDigital();
    
    // Create virtual body
    const VirtualBody = require('./virtual-body-interface');
    this.body = new VirtualBody();
    this.body.createBody(bodyType);
    this.body.connect();
    
    // Create sensorimotor loop
    const Sensorimotor = require('./sensorimotor-loop');
    this.loop = new Sensorimotor();
    this.loop.startLoop();
    
    // Create neural circuits
    const NeuralCircuit = require('./neural-circuit-behavior');
    this.circuits = new NeuralCircuit();
    
    if (bodyType === 'fly') {
      this.circuits.loadFlyBrain();
    } else {
      this.circuits.loadMouseBrain();
    }
    
    return {
      brain: 'Genome Digital v2.0',
      body: bodyType,
      neurons: bodyType === 'fly' ? 125000 : 70000000,
      status: 'ready'
    };
  }

  // Run one cycle of brain-body simulation
  runCycle(sensoryInput) {
    if (!this.running) {
      return { error: 'Not running. Call start() first.' };
    }
    
    // Step 1: Get sensory input
    const sensory = sensoryInput || this.body.getSensoryData();
    
    // Step 2: Brain processes input
    const brainOutput = this.brain.think(sensory);
    
    // Step 3: Neural circuits generate behavior
    const behavior = this.circuits.generate(Math.random());
    
    // Step 4: Motor commands
    const motorCommands = this.circuits.generateMotorCommands(behavior.behavior);
    
    // Step 5: Body executes commands
    motorCommands.forEach(cmd => {
      this.body.sendMotorCommand(cmd);
    });
    
    // Step 6: Body moves and produces new sensory input
    const newSensory = this.body.getSensoryData();
    
    return {
      cycle: Date.now(),
      input: sensory,
      brain: brainOutput,
      behavior: behavior.behavior,
      motors: motorCommands,
      output: newSensory,
      complete: true
    };
  }

  // Start simulation
  start() {
    this.running = true;
    return { running: true, status: 'simulation started' };
  }

  // Stop simulation
  stop() {
    this.running = false;
    this.loop.stopLoop();
    this.body.disconnect();
    return { running: false, status: 'simulation stopped' };
  }

  // Get full status
  getStatus() {
    return {
      running: this.running,
      brain: this.brain ? this.brain.getStatus() : null,
      body: this.body ? this.body.getStatus() : null,
      circuits: this.circuits ? this.circuits.getCircuitInfo() : null
    };
  }

  // Teach the brain something
  learn(information) {
    return this.brain.learn(information);
  }

  // Ask the brain something
  ask(question) {
    return this.brain.think(question);
  }
}

// Run demo if called directly
if (require.main === module) {
  const integration = new BrainBodyIntegration();
  
  console.log('=== Brain-Body Integration Demo ===\n');
  
  // Initialize
  console.log('1. Initializing...');
  const init = integration.initialize('fly');
  console.log(init);
  
  // Start
  console.log('\n2. Starting simulation...');
  console.log(integration.start());
  
  // Run a few cycles
  console.log('\n3. Running 3 cycles...\n');
  for (let i = 0; i < 3; i++) {
    const result = integration.runCycle();
    console.log(`Cycle ${i + 1}:`, result.behavior, '→', result.motorCommands.map(c => c.target));
  }
  
  // Teach and ask
  console.log('\n4. Teaching brain: "Flies avoid heat"');
  integration.learn('Flies avoid heat');
  
  console.log('\n5. Asking brain: "What do flies avoid?"');
  console.log(integration.ask('What do flies avoid?'));
  
  // Stop
  console.log('\n6. Stopping...');
  console.log(integration.stop());
  
  console.log('\n✅ Demo complete!');
}

module.exports = BrainBodyIntegration;
