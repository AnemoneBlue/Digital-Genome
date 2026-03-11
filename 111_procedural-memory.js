/**
 * Genome Digital - Procedural Memory
 * Motor skills and habits - knowing how
 * Added: 11 Mar 2026
 */

class ProceduralMemory {
  constructor() {
    this.procedures = new Map();
    this.skillLevels = new Map();
    this.practiceCount = new Map();
  }

  learn(procedure, steps) {
    this.procedures.set(procedure, {
      steps,
      learned: Date.now(),
      complexity: steps.length,
      proficiency: 0
    });
    this.practiceCount.set(procedure, 0);
    return { procedure, steps: steps.length, complexity: steps.length };
  }

  execute(procedure) {
    const proc = this.procedures.get(procedure);
    if (!proc) return { error: 'Procedure not found' };
    
    const proficiency = this.getProficiency(procedure);
    this.practiceCount.set(procedure, this.practiceCount.get(procedure) + 1);
    
    return {
      procedure,
      executed: true,
      proficiency,
      automatic: proficiency > 0.8
    };
  }

  getProficiency(procedure) {
    const count = this.practiceCount.get(procedure) || 0;
    return Math.min(1, count / 20);
  }

  improve(procedure) {
    const proc = this.procedures.get(procedure);
    if (proc) {
      proc.proficiency = this.getProficiency(procedure);
    }
    return proc;
  }

  getAllProcedures() {
    return Array.from(this.procedures.entries()).map(([name, data]) => ({
      name,
      ...data,
      proficiency: this.getProficiency(name),
      practiceCount: this.practiceCount.get(name) || 0
    }));
  }
}

module.exports = ProceduralMemory;
