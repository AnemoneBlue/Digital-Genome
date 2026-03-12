/**
 * Genome Digital - Neural Pathway Module
 * Simulates neural pathways between brain regions
 * Added: 12 Mar 2026
 */

class NeuralPathway {
  constructor() {
    this.regions = {
      sensory_cortex: { connected: false, activity: 0 },
      motor_cortex: { connected: false, activity: 0 },
      hippocampus: { connected: false, activity: 0 },
      amygdala: { connected: false, activity: 0 },
      prefrontal: { connected: false, activity: 0 },
      cerebellum: { connected: false, activity: 0 }
    };
    this.pathways = [];
    this.signalHistory = [];
  }

  // Initialize brain regions
  initializeBrain() {
    Object.keys(this.regions).forEach(region => {
      this.regions[region].connected = true;
    });
    return { brainInitialized: true, regions: Object.keys(this.regions) };
  }

  // Create pathway between two regions
  createPathway(from, to, strength = 0.5) {
    const pathway = {
      from,
      to,
      strength,
      active: false,
      signal: 0
    };
    this.pathways.push(pathway);
    return pathway;
  }

  // Propagate signal through pathway
  propagateSignal(fromRegion, intensity) {
    // Set source activity
    this.regions[fromRegion].activity = intensity;

    // Find outgoing pathways
    const outgoing = this.pathways.filter(p => p.from === fromRegion);
    
    const signals = outgoing.map(pathway => {
      // Reduce signal strength through pathway
      const signal = intensity * pathway.strength;
      pathway.signal = signal;
      pathway.active = true;

      // Increase target region activity
      this.regions[pathway.to].activity += signal;

      return {
        from: fromRegion,
        to: pathway.to,
        originalIntensity: intensity,
        outputSignal: signal
      };
    });

    this.signalHistory.push({
      timestamp: Date.now(),
      source: fromRegion,
      signals
    });

    return signals;
  }

  // Process input through full brain network
  process(input) {
    // Start with sensory cortex
    const sensorySignals = this.propagateSignal('sensory_cortex', input.intensity || 0.5);

    // Forward to motor cortex
    const motorSignals = this.propagateSignal('motor_cortex', 
      this.regions['sensory_cortex'].activity * 0.8);

    // Also activate hippocampus for memory
    this.propagateSignal('hippocampus', this.regions['sensory_cortex'].activity * 0.3);

    // Prefrontal for decision making
    const decisionSignals = this.propagateSignal('prefrontal',
      this.regions['motor_cortex'].activity * 0.6);

    return {
      input,
      sensory: sensorySignals,
      motor: motorSignals,
      decision: decisionSignals,
      brainState: this.regions
    };
  }

  // Get brain region states
  getBrainState() {
    return this.regions;
  }

  // Get pathway info
  getPathways() {
    return this.pathways;
  }

  // Get signal history
  getHistory() {
    return this.signalHistory;
  }

  getStatus() {
    return {
      regions: Object.keys(this.regions).length,
      activeRegions: Object.values(this.regions).filter(r => r.connected).length,
      pathways: this.pathways.length,
      signalsProcessed: this.signalHistory.length
    };
  }
}

module.exports = NeuralPathway;
