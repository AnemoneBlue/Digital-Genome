/**
 * 🎯 Prefrontal Cortex
 * Executive functions and decision making
 */

class PrefrontalCortex {
  constructor() {
    this.regions = this.initializeRegions();
    this.workingMemory = [];
    this.planningQueue = [];
  }

  initializeRegions() {
    return {
      dorsolateral: {
        name: 'Dorsolateral PFC (dlPFC)',
        function: 'working memory, cognitive control, planning',
        neurotransmitters: ['dopamine', 'glutamate']
      },
      ventromedial: {
        name: 'Ventromedial PFC (vmPFC)',
        function: 'emotion regulation, reward processing, social behavior',
        neurotransmitters: ['dopamine', 'serotonin']
      },
      orbitofrontal: {
        name: 'Orbitofrontal Cortex (OFC)',
        function: 'decision making, reward valuation, impulse control',
        neurotransmitters: ['dopamine', 'serotonin']
      },
      anteriorCingulate: {
        name: 'Anterior Cingulate Cortex (ACC)',
        function: 'conflict monitoring, error detection, pain',
        neurotransmitters: ['glutamate', 'GABA']
      }
    };
  }

  // Working memory operations
  workingMemoryOperation(operation, data) {
    const operations = {
      store: () => {
        if (this.workingMemory.length < 7) {
          this.workingMemory.push(data);
          return { stored: true, capacity: this.workingMemory.length };
        }
        return { stored: false, reason: 'capacity exceeded' };
      },
      retrieve: () => {
        return { retrieved: data, from: 'working memory' };
      },
      update: () => {
        const index = this.workingMemory.findIndex(item => item.id === data.id);
        if (index >= 0) {
          this.workingMemory[index] = data;
          return { updated: true };
        }
        return { updated: false };
      },
      clear: () => {
        this.workingMemory = [];
        return { cleared: true };
      }
    };

    return operations[operation] ? operations[operation]() : { error: 'unknown operation' };
  }

  // Executive decision making
  makeDecision(options, criteria) {
    const evaluated = options.map(option => {
      let score = 0;
      for (const criterion of criteria) {
        score += option[criterion] * criterion.weight;
      }
      return { option, score, criteria };
    });

    evaluated.sort((a, b) => b.score - a.score);

    return {
      decision: evaluated[0].option,
      confidence: evaluated[0].score / criteria.reduce((a, c) => a + c.weight, 0),
      alternatives: evaluated.slice(1),
      brainRegions: ['dlPFC', 'ACC', 'vmPFC']
    };
  }

  // Planning and goal-directed behavior
  plan(goal, steps) {
    const plan = {
      goal,
      steps: steps.map((step, i) => ({
        order: i + 1,
        action: step,
        prefrontalInvolvement: 1 - (i * 0.1), // Decreases with practice
        status: 'planned'
      })),
      timeline: steps.length * 10, // minutes
      successProbability: 0.7 + Math.random() * 0.2
    };

    this.planningQueue.push(plan);
    return plan;
  }

  // Impulse control
  impulseControl(stimulus, response) {
    const inhibition = Math.random() * 0.5 + 0.3; // 30-80% success
    const delayedResponse = inhibition > 0.5 ? true : false;

    return {
      stimulus,
      immediateResponse: response,
      inhibited: delayedResponse,
      delayTime: delayedResponse ? Math.random() * 5000 : 0,
      prefrontalInhibition: inhibition
    };
  }

  // Cognitive flexibility
  cognitiveFlexibility(task) {
    const switchCost = Math.random() * 200; // ms
    const accuracy = Math.random() * 0.3 + 0.7;

    return {
      task,
      switchCost,
      accuracy,
      flexible: accuracy > 0.8,
      setShifting: 'possible'
    };
  }

  // Risk assessment
  assessRisk(action) {
    const riskFactors = {
      financial: { probability: 0.3, impact: 8 },
      physical: { probability: 0.1, impact: 10 },
      social: { probability: 0.2, impact: 6 },
      reputational: { probability: 0.15, impact: 7 }
    };

    const risk = riskFactors[action] || { probability: 0.5, impact: 5 };
    const expectedValue = (1 - risk.probability) * risk.impact - risk.probability * risk.impact;

    return {
      risk,
      expectedValue,
      recommendation: expectedValue > 0 ? 'proceed with caution' : 'avoid',
      vmPFCActivation: risk.probability * 100 + '%'
    };
  }

  getWorkingMemoryContent() {
    return this.workingMemory;
  }
}

module.exports = new PrefrontalCortex();
