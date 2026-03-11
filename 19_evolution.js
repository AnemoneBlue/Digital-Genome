/**
 * Genome Digital - Evolution Module
 * Allows the digital brain to evolve and improve over time
 * Added: 6 Mar 2026
 */

class EvolutionEngine {
  constructor() {
    this.generation = 0;
    this.population = [];
    this.mutations = [];
    this.fitnessHistory = [];
    this.traits = {
      creativity: 0.5,
      curiosity: 0.5,
      memoryCapacity: 0.5,
      learningRate: 0.5,
      emotionalSensitivity: 0.5,
      reasoningDepth: 0.5,
      intuition: 0.5,
      wisdom: 0.5
    };
  }

  // Create a new generation
  createGeneration(brainState) {
    this.generation++;
    
    const entity = {
      id: this.generation,
      traits: { ...this.traits },
      fitness: this.calculateFitness(brainState),
      created: Date.now(),
      ancestors: brainState.ancestors || []
    };
    
    this.population.push(entity);
    this.fitnessHistory.push(entity.fitness);
    
    return entity;
  }

  // Calculate fitness based on brain performance
  calculateFitness(brainState) {
    let score = 0;
    
    // Weight different factors
    if (brainState.thoughts) score += Math.min(brainState.thoughts * 0.1, 20);
    if (brainState.memories) score += Math.min(brainState.memories * 0.05, 15);
    if (brainState.learning) score += brainState.learning * 10;
    if (brainState.decisions) score += Math.min(brainState.decisions * 0.2, 15);
    if (brainState.creativity) score += brainState.creativity * 10;
    
    // Penalize negative states
    if (brainState.errors) score -= brainState.errors * 2;
    
    return Math.max(0, Math.min(100, score));
  }

  // Mutate traits
  mutate(traits, rate = 0.1) {
    const newTraits = { ...traits };
    const mutationTypes = ['small', 'medium', 'large'];
    
    for (const [trait, value] of Object.entries(newTraits)) {
      if (Math.random() < rate) {
        const mutationType = mutationTypes[Math.floor(Math.random() * 3)];
        const change = mutationType === 'small' ? 0.05 : 
                      mutationType === 'medium' ? 0.1 : 0.2;
        
        const direction = Math.random() > 0.5 ? 1 : -1;
        newTraits[trait] = Math.max(0, Math.min(1, value + (change * direction)));
        
        this.mutations.push({
          trait,
          oldValue: value,
          newValue: newTraits[trait],
          type: mutationType,
          generation: this.generation
        });
      }
    }
    
    return newTraits;
  }

  // Crossover two trait sets
  crossover(parent1, parent2) {
    const child = {};
    const genes = Object.keys(parent1);
    
    for (const gene of genes) {
      // 50% chance from each parent
      child[gene] = Math.random() > 0.5 ? parent1[gene] : parent2[gene];
    }
    
    return child;
  }

  // Select best traits (survival of the fittest)
  selectBest(percentage = 0.5) {
    const sorted = [...this.population].sort((a, b) => b.fitness - a.fitness);
    const count = Math.max(1, Math.floor(sorted.length * percentage));
    return sorted.slice(0, count);
  }

  // Evolve to next generation
  evolve(brainState) {
    // Create current generation entity
    const current = this.createGeneration(brainState);
    
    // If we have enough population, evolve
    if (this.population.length >= 2) {
      const best = this.selectBest(0.5);
      
      // Create new traits through crossover and mutation
      if (best.length >= 2) {
        const parent1 = best[0].traits;
        const parent2 = best[1].traits;
        
        let newTraits = this.crossover(parent1, parent2);
        newTraits = this.mutate(newTraits);
        
        this.traits = newTraits;
      }
    }
    
    return {
      generation: this.generation,
      traits: this.traits,
      fitness: current.fitness,
      mutations: this.mutations.length
    };
  }

  // Get evolution statistics
  getStats() {
    const avgFitness = this.fitnessHistory.length > 0
      ? this.fitnessHistory.reduce((a, b) => a + b, 0) / this.fitnessHistory.length
      : 0;
    
    return {
      generation: this.generation,
      populationSize: this.population.length,
      averageFitness: avgFitness.toFixed(2),
      totalMutations: this.mutations.length,
      currentTraits: this.traits,
      bestFitness: Math.max(...this.fitnessHistory, 0),
      worstFitness: Math.min(...this.fitnessHistory, 0)
    };
  }

  // Reset evolution
  reset() {
    this.generation = 0;
    this.population = [];
    this.mutations = [];
    this.fitnessHistory = [];
    this.traits = {
      creativity: 0.5,
      curiosity: 0.5,
      memoryCapacity: 0.5,
      learningRate: 0.5,
      emotionalSensitivity: 0.5,
      reasoningDepth: 0.5,
      intuition: 0.5,
      wisdom: 0.5
    };
  }

  // Export traits for saving
  exportTraits() {
    return {
      traits: this.traits,
      generation: this.generation,
      exported: Date.now()
    };
  }

  // Import traits
  importTraits(data) {
    if (data.traits) {
      this.traits = data.traits;
    }
    if (data.generation) {
      this.generation = data.generation;
    }
  }
}

// Demo
if (require.main === module) {
  const evolution = new EvolutionEngine();
  
  console.log('🧬 Evolution Engine Demo\n');
  
  // Simulate some generations
  for (let i = 0; i < 5; i++) {
    const brainState = {
      thoughts: Math.floor(Math.random() * 100),
      memories: Math.floor(Math.random() * 50),
      learning: Math.random(),
      decisions: Math.floor(Math.random() * 30),
      creativity: Math.random()
    };
    
    const result = evolution.evolve(brainState);
    console.log(`Gen ${result.generation}: fitness=${result.fitness}, mutations=${result.mutations}`);
  }
  
  console.log('\n📊 Final Stats:');
  console.log(JSON.stringify(evolution.getStats(), null, 2));
  
  console.log('\n🧬 Current Traits:');
  console.log(evolution.traits);
}

module.exports = EvolutionEngine;
