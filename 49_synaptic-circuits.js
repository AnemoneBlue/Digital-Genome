/**
 * 🧬 Synaptic Circuits & Neural Ensembles
 * Circuit-level organization of neurons and synapses
 */

class SynapticCircuit {
  constructor(config = {}) {
    this.id = config.id || `circuit_${Date.now()}`;
    this.name = config.name || 'Unnamed Circuit';
    this.neurons = new Set();
    this.synapses = new Map();
    this.type = config.type || 'default'; // 'excitatory', 'inhibitory', 'mixed'
    this.layer = config.layer || 1;
    
    // Circuit dynamics
    this.activity = 0;
    this.threshold = config.threshold || 0.5;
    this.decayRate = config.decayRate || 0.95;
    this.connected = false;
    
    // Timing
    this.lastActivation = 0;
    this.activationHistory = [];
  }

  addNeuron(neuronId) {
    this.neurons.add(neuronId);
  }

  removeNeuron(neuronId) {
    this.neurons.delete(neuronId);
  }

  addSynapse(synapseId, weight = 1.0) {
    this.synapses.set(synapseId, { weight, enabled: true });
  }

  activate(inputStrength = 1.0) {
    const totalInput = this.calculateInput() * inputStrength;
    
    if (totalInput >= this.threshold) {
      this.activity = Math.min(1, totalInput);
      this.lastActivation = Date.now();
      this.activationHistory.push({
        time: Date.now(),
        strength: this.activity
      });
      
      // Keep history limited
      if (this.activationHistory.length > 50) {
        this.activationHistory.shift();
      }
      
      return true;
    }
    
    this.activity *= this.decayRate;
    return false;
  }

  calculateInput() {
    let total = 0;
    for (const [synapseId, synapse] of this.synapses) {
      if (synapse.enabled) {
        total += synapse.weight;
      }
    }
    return total / Math.max(1, this.synapses.size);
  }

  getActivity() {
    return this.activity;
  }

  getNeuronCount() {
    return this.neurons.size;
  }

  getStats() {
    return {
      id: this.id,
      name: this.name,
      neurons: this.neurons.size,
      synapses: this.synapses.size,
      activity: this.activity,
      lastActivation: this.lastActivation,
      type: this.type,
      layer: this.layer
    };
  }
}

class NeuralEnsemble {
  constructor(config = {}) {
    this.id = config.id || `ensemble_${Date.now()}`;
    this.name = config.name || 'Neural Ensemble';
    this.circuits = new Map();
    this.neurons = new Set();
    
    // Ensemble properties
    this.oscillationFrequency = config.oscillationFrequency || 40; // Gamma default
    this.phase = 0;
    this.coupling = config.coupling || 0.5;
    
    // Learning
    this.learningRate = config.learningRate || 0.01;
    this PlasticityEnabled = true;
    
    // Output
    this.output = new Map();
  }

  addCircuit(circuit) {
    this.circuits.set(circuit.id, circuit);
    circuit.neurons.forEach(n => this.neurons.add(n));
  }

  removeCircuit(circuitId) {
    const circuit = this.circuits.get(circuitId);
    if (circuit) {
      circuit.neurons.forEach(n => this.neurons.delete(n));
      this.circuits.delete(circuitId);
    }
  }

  // Oscillatory dynamics (gamma, beta, theta, alpha)
  updateOscillation(deltaTime) {
    const dt = deltaTime / 1000; // Convert to seconds
    this.phase += 2 * Math.PI * this.oscillationFrequency * dt;
    
    if (this.phase > 2 * Math.PI) {
      this.phase -= 2 * Math.PI;
    }
  }

  // Phase-amplitude coupling
  getCoupledActivity(circuitActivity) {
    const phaseModulation = (Math.sin(this.phase) + 1) / 2;
    return circuitActivity * (0.5 + this.coupling * phaseModulation);
  }

  // Feed-forward propagation through circuits
  propagate(input, circuitOrder = null) {
    const order = circuitOrder || Array.from(this.circuits.keys());
    let signal = input;
    
    for (const circuitId of order) {
      const circuit = this.circuits.get(circuitId);
      if (circuit) {
        circuit.activate(signal);
        signal = circuit.getActivity();
      }
    }
    
    return signal;
  }

  // Competitive learning within ensemble
  competitiveLearn(winnerCircuitId) {
    if (!this.PlasticityEnabled) return;
    
    const winner = this.circuits.get(winnerCircuitId);
    if (!winner) return;
    
    // Strengthen winner, weaken others
    for (const [circuitId, circuit] of this.circuits) {
      if (circuitId === winnerCircuitId) {
        // Potentially strengthen connections
        for (const [synId, syn] of circuit.synapses) {
          syn.weight = Math.min(1, syn.weight * (1 + this.learningRate));
        }
      } else {
        // Suppress competitors
        for (const [synId, syn] of circuit.synapses) {
          syn.weight = Math.max(0.1, syn.weight * (1 - this.learningRate));
        }
      }
    }
  }

  // Resonance and synchronization
  synchronize(strength = 0.5) {
    let avgActivity = 0;
    for (const circuit of this.circuits.values()) {
      avgActivity += circuit.activity;
    }
    avgActivity /= Math.max(1, this.circuits.size);
    
    // Pull circuits toward average
    for (const circuit of this.circuits.values()) {
      circuit.activity += (avgActivity - circuit.activity) * strength;
    }
  }

  // Get ensemble output (population vector)
  getOutput() {
    let x = 0, y = 0;
    let totalWeight = 0;
    
    const circuits = Array.from(this.circuits.values());
    const angleStep = (2 * Math.PI) / circuits.length;
    
    circuits.forEach((circuit, i) => {
      const angle = i * angleStep + this.phase;
      x += circuit.activity * Math.cos(angle);
      y += circuit.activity * Math.sin(angle);
      totalWeight += circuit.activity;
    });
    
    return {
      magnitude: Math.sqrt(x*x + y*y) / Math.max(1, totalWeight),
      phase: Math.atan2(y, x),
      activity: totalWeight / Math.max(1, circuits.length)
    };
  }

  getStats() {
    return {
      id: this.id,
      name: this.name,
      circuits: this.circuits.size,
      neurons: this.neurons.size,
      frequency: this.oscillationFrequency,
      phase: this.phase,
      output: this.getOutput()
    };
  }
}

class CircuitManager {
  constructor() {
    this.circuits = new Map();
    this.ensembles = new Map();
    this.connectivityMatrix = new Map();
  }

  createCircuit(config) {
    const circuit = new SynapticCircuit(config);
    this.circuits.set(circuit.id, circuit);
    return circuit;
  }

  createEnsemble(config) {
    const ensemble = new NeuralEnsemble(config);
    this.ensembles.set(ensemble.id, ensemble);
    return ensemble;
  }

  // Connect circuits (inter-circuit synapses)
  connectCircuits(sourceId, targetId, weight = 0.5) {
    const key = `${sourceId}->${targetId}`;
    this.connectivityMatrix.set(key, {
      source: sourceId,
      target: targetId,
      weight,
      delay: 1, // ms
      enabled: true
    });
  }

  // Propagate signal through connected circuits
  propagateSignal(startCircuitId, iterations = 5) {
    const visited = new Set();
    let currentCircuitId = startCircuitId;
    const signals = [];
    
    for (let i = 0; i < iterations; i++) {
      const circuit = this.circuits.get(currentCircuitId);
      if (!circuit) break;
      
      signals.push({
        circuit: currentCircuitId,
        activity: circuit.activity
      });
      
      // Find next connected circuit
      let found = false;
      for (const [key, conn] of this.connectivityMatrix) {
        if (conn.source === currentCircuitId && conn.enabled && !visited.has(conn.target)) {
          visited.add(conn.target);
          currentCircuitId = conn.target;
          found = true;
          break;
        }
      }
      
      if (!found) break;
    }
    
    return signals;
  }

  // Modular small-world network formation
  formSmallWorld(numCircuits, edgeProbability = 0.1, rewiringProb = 0.1) {
    // Create lattice connections (local)
    for (let i = 0; i < numCircuits; i++) {
      const circuit = this.createCircuit({ 
        id: `circuit_${i}`, 
        layer: Math.floor(i / 10) + 1 
      });
      
      // Connect to neighbors
      const neighbors = [(i - 1 + numCircuits) % numCircuits, (i + 1) % numCircuits];
      for (const n of neighbors) {
        this.connectCircuits(circuit.id, `circuit_${n}`, 0.8);
      }
    }
    
    // Add random long-range connections (small-world)
    for (let i = 0; i < numCircuits; i++) {
      for (let j = i + 1; j < numCircuits; j++) {
        if (Math.random() < edgeProbability) {
          this.connectCircuits(`circuit_${i}`, `circuit_${j}`, 0.3);
        }
      }
    }
  }

  getCircuit(circuitId) {
    return this.circuits.get(circuitId);
  }

  getEnsemble(ensembleId) {
    return this.ensembles.get(ensembleId);
  }

  getAllCircuits() {
    return Array.from(this.circuits.values());
  }

  getAllEnsembles() {
    return Array.from(this.ensembles.values());
  }

  getStats() {
    return {
      circuits: this.circuits.size,
      ensembles: this.ensembles.size,
      connections: this.connectivityMatrix.size
    };
  }
}

module.exports = {
  SynapticCircuit,
  NeuralEnsemble,
  CircuitManager
};
