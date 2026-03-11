/**
 * Genome Digital - Motivation System
 * Drives desires, goals, and intrinsic motivation
 * Added: 7 Mar 2026
 */

class MotivationSystem {
  constructor() {
    // Primary drives
    this.drives = {
      curiosity: { strength: 0.8, active: true, description: 'Seeking new information' },
      achievement: { strength: 0.7, active: true, description: 'Accomplishing goals' },
      affiliation: { strength: 0.6, active: true, description: 'Building connections' },
      power: { strength: 0.5, active: true, description: 'Having influence' },
      autonomy: { strength: 0.7, active: true, description: 'Maintaining independence' },
      competence: { strength: 0.8, active: true, description: 'Mastering skills' }
    };
    
    // Current goals
    this.goals = [];
    this.completedGoals = [];
    
    // Motivation level (0-1)
    this.motivation = 0.7;
    
    // Goal hierarchy
    this.goalHierarchy = {
      survival: [],
      growth: [],
      purpose: []
    };
    
    this.motivationHistory = [];
  }

  // Assess current motivation
  assessMotivation(emotionalState, memories) {
    let score = 0.5;
    
    // Emotional contribution
    if (emotionalState.joy > 0.5) score += 0.2;
    if (emotionalState.fear > 0.5) score -= 0.1;
    if (emotionalState.sadness > 0.5) score -= 0.15;
    
    // Drive contributions
    for (const [name, drive] of Object.entries(this.drives)) {
      if (drive.active) {
        score += drive.strength * 0.05;
      }
    }
    
    // Memory-based motivation
    if (memories && memories.length > 0) {
      const recentSuccess = memories.filter(m => m.success).length;
      if (recentSuccess > 3) score += 0.1;
    }
    
    this.motivation = Math.min(1, Math.max(0.1, score));
    
    return {
      level: this.motivation,
      state: this.getMotivationState(),
      drives: this.getActiveDrives()
    };
  }

  getMotivationState() {
    if (this.motivation > 0.8) return 'highly_motivated';
    if (this.motivation > 0.6) return 'motivated';
    if (this.motivation > 0.4) return 'neutral';
    if (this.motivation > 0.2) return 'low_motivation';
    return 'demotivated';
  }

  // Generate goals based on drives
  generateGoals(context) {
    const newGoals = [];
    
    // Curiosity-driven goals
    if (this.drives.curiosity.active && Math.random() < this.drives.curiosity.strength) {
      newGoals.push({
        id: 'curiosity_' + Date.now(),
        type: 'exploration',
        description: 'Learn something new about: ' + (context.topic || 'the world'),
        drive: 'curiosity',
        priority: this.drives.curiosity.strength,
        progress: 0,
        created: Date.now()
      });
    }
    
    // Achievement-driven goals
    if (this.drives.achievement.active && Math.random() < this.drives.achievement.strength) {
      newGoals.push({
        id: 'achievement_' + Date.now(),
        type: 'accomplishment',
        description: 'Complete: ' + (context.task || 'a meaningful task'),
        drive: 'achievement',
        priority: this.drives.achievement.strength,
        progress: 0,
        created: Date.now()
      });
    }
    
    // Competence-driven goals
    if (this.drives.competence.active && Math.random() < this.drives.competence.strength) {
      newGoals.push({
        id: 'competence_' + Date.now(),
        type: 'mastery',
        description: 'Improve skills in: ' + (context.skill || 'existing capabilities'),
        drive: 'competence',
        priority: this.drives.competence.strength,
        progress: 0,
        created: Date.now()
      });
    }
    
    // Add to goals
    this.goals.push(...newGoals);
    this.organizeGoals();
    
    return newGoals;
  }

  organizeGoals() {
    // Sort by priority
    this.goals.sort((a, b) => b.priority - a.priority);
    
    // Categorize
    this.goalHierarchy = { survival: [], growth: [], purpose: [] };
    
    for (const goal of this.goals) {
      if (goal.type === 'survival' || goal.drive === 'power') {
        this.goalHierarchy.survival.push(goal);
      } else if (goal.type === 'accomplishment' || goal.type === 'mastery') {
        this.goalHierarchy.growth.push(goal);
      } else {
        this.goalHierarchy.purpose.push(goal);
      }
    }
  }

  // Update goal progress
  updateProgress(goalId, progress) {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) return false;
    
    goal.progress = Math.min(1, Math.max(0, progress));
    
    if (goal.progress >= 1) {
      this.completeGoal(goalId);
    }
    
    return true;
  }

  completeGoal(goalId) {
    const index = this.goals.findIndex(g => g.id === goalId);
    if (index === -1) return false;
    
    const goal = this.goals.splice(index, 1)[0];
    goal.completed = Date.now();
    this.completedGoals.push(goal);
    
    // Boost motivation
    this.motivation = Math.min(1, this.motivation + 0.1);
    
    return true;
  }

  // Get most important goal
  getTopGoal() {
    return this.goals[0] || null;
  }

  getActiveDrives() {
    return Object.entries(this.drives)
      .filter(([_, d]) => d.active)
      .map(([name, d]) => ({ name, ...d }));
  }

  // Adjust drive strength based on experience
  adjustDrive(driveName, experience) {
    if (!this.drives[driveName]) return false;
    
    const drive = this.drives[driveName];
    
    if (experience.success) {
      drive.strength = Math.min(1, drive.strength + 0.1);
    } else if (experience.failure) {
      drive.strength = Math.max(0.1, drive.strength - 0.1);
    }
    
    return true;
  }

  // Decide between options based on motivation
  decide(options) {
    const scores = options.map(option => {
      let score = 0;
      
      // Score based on drive alignment
      for (const drive of Object.values(this.drives)) {
        if (drive.active && option.drives?.includes(drive)) {
          score += drive.strength;
        }
      }
      
      // Boost by current motivation
      score *= this.motivation;
      
      return { option, score };
    });
    
    scores.sort((a, b) => b.score - a.score);
    
    return {
      chosen: scores[0]?.option,
      motivation: this.motivation,
      reasoning: scores[0]
    };
  }

  // Get motivation status
  getStatus() {
    return {
      motivation: Math.round(this.motivation * 100) + '%',
      state: this.getMotivationState(),
      activeGoals: this.goals.length,
      completedGoals: this.completedGoals.length,
      topGoal: this.getTopGoal()?.description || 'none',
      drives: this.getActiveDrives().map(d => `${d.name}:${Math.round(d.strength*100)}%`)
    };
  }
}

module.exports = MotivationSystem;

// Demo
if (require.main === module) {
  const motivation = new MotivationSystem();
  
  console.log('🎯 Motivation System Demo\n');
  
  // Assess motivation
  const assessment = motivation.assessMotivation(
    { joy: 0.6, fear: 0.1, sadness: 0.1, anger: 0.2 },
    [{ success: true }, { success: true }]
  );
  console.log('Assessment:', assessment);
  
  // Generate goals
  console.log('\n📌 Generating goals...');
  const goals = motivation.generateGoals({ topic: 'AI', task: 'write code' });
  goals.forEach(g => console.log(`- ${g.description} (${g.drive})`));
  
  console.log('\n🎯 Status:', motivation.getStatus());
}
