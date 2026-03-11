/**
 * Genome Digital - Immune System
 * Defense mechanisms and health monitoring
 * Added: 6 Mar 2026
 */

class ImmuneSystem {
  constructor() {
    this.health = 1.0; // 0-1 overall health
    this.threatLevel = 0; // Current threat level
    this.antibodies = new Map(); // Known threats and responses
    this.immuneResponse = false;
    this.recoveryMode = false;
    
    // Initialize some basic "antibodies"
    this.registerThreat('virus', { severity: 0.8, response: 'fight' });
    this.registerThreat('bacteria', { severity: 0.7, response: 'fight' });
    this.registerThreat('stress', { severity: 0.5, response: 'manage' });
    this.registerThreat('fatigue', { severity: 0.4, response: 'rest' });
    this.registerThreat('error', { severity: 0.6, response: 'fix' });
  }

  // Register a known threat type
  registerThreat(name, response) {
    this.antibodies.set(name, {
      name,
      response,
      strength: 0.5,
      encounters: 0
    });
  }

  // Detect and respond to threat
  detectThreat(threat) {
    this.threatLevel = Math.min(1, this.threatLevel + threat.severity);
    
    const threatType = threat.type || 'unknown';
    
    if (this.antibodies.has(threatType)) {
      const antibody = this.antibodies.get(threatType);
      antibody.encounters++;
      antibody.strength = Math.min(1, antibody.strength + 0.1);
      
      // Stronger response for known threats
      return this.respond(antibody.response, threat.severity * antibody.strength);
    } else {
      // Unknown threat - stronger response
      return this.respond('fight', threat.severity * 0.5);
    }
  }

  // Generate immune response
  respond(strategy, intensity) {
    this.immuneResponse = true;
    
    let response = {
      strategy,
      intensity,
      actions: []
    };
    
    switch (strategy) {
      case 'fight':
        response.actions.push('activate_defenses');
        response.actions.push('increase_vigilance');
        this.health = Math.max(0, this.health - intensity * 0.1);
        break;
        
      case 'manage':
        response.actions.push('reduce_load');
        response.actions.push('prioritize_recovery');
        this.recoveryMode = true;
        break;
        
      case 'rest':
        response.actions.push('enter_recovery');
        response.actions.push('conserve_energy');
        this.recoveryMode = true;
        break;
        
      case 'fix':
        response.actions.push('identify_error');
        response.actions.push('apply_correction');
        break;
    }
    
    return response;
  }

  // Process error/threat
  processError(error) {
    return this.detectThreat({
      type: 'error',
      severity: error.severity || 0.5
    });
  }

  // Natural recovery
  recover() {
    if (this.recoveryMode) {
      this.health = Math.min(1, this.health + 0.02);
      this.threatLevel = Math.max(0, this.threatLevel - 0.05);
      
      if (this.threatLevel < 0.1 && this.health > 0.8) {
        this.recoveryMode = false;
        this.immuneResponse = false;
      }
    }
  }

  // Get system status
  getStatus() {
    return {
      health: Math.round(this.health * 100) + '%',
      threatLevel: Math.round(this.threatLevel * 100) + '%',
      immuneResponse: this.immuneResponse,
      recoveryMode: this.recoveryMode,
      knownThreats: this.antibodies.size,
      antibodies: Array.from(this.antibodies.values()).map(a => ({
        name: a.name,
        strength: Math.round(a.strength * 100) + '%',
        encounters: a.encounters
      }))
    };
  }

  // Check if healthy enough for demanding tasks
  canPerform(taskDifficulty) {
    if (this.recoveryMode) return false;
    if (this.health < 0.3) return false;
    if (this.threatLevel > 0.7) return false;
    return this.health >= taskDifficulty;
  }

  // Reduce threat level
  calmDown() {
    this.threatLevel = Math.max(0, this.threatLevel - 0.3);
    this.immuneResponse = false;
  }
}

module.exports = ImmuneSystem;

// Demo
if (require.main === module) {
  const immune = new ImmuneSystem();
  
  console.log('🛡️ Immune System Demo\n');
  
  // Simulate threats
  const threats = [
    { type: 'virus', severity: 0.6 },
    { type: 'stress', severity: 0.4 },
    { type: 'bacteria', severity: 0.5 }
  ];
  
  threats.forEach(threat => {
    const response = immune.detectThreat(threat);
    console.log(`Threat: ${threat.type} → Strategy: ${response.strategy}, Actions: ${response.actions.join(', ')}`);
  });
  
  console.log('\n📊 Status:');
  console.log(JSON.stringify(immune.getStatus(), null, 2));
}
