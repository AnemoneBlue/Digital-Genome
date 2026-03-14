/**
 * ================================================================================
 * GENOME DIGITAL - ATTENTION MODULE v2.0
 * ================================================================================
 * Comprehensive attention system with focus, divided attention, and salience
 * ================================================================================
 */

class AttentionModule {
  constructor(options = {}) {
    // Attention parameters
    this.focusLevel = options.focusLevel || 0.5;
    this.dividedAttentionCapacity = options.dividedCapacity || 3;
    
    // Current attention state
    this.focusedItem = null;
    this.attendedItems = [];
    this.attentionShifts = 0;
    this.lastShiftTime = Date.now();
    
    // Salience map (what stands out)
    this.salienceMap = {};
    
    // Attentional resources
    this.resources = {
      total: 1.0,
      available: 1.0,
      allocated: {}
    };
    
    // Attention types
    this.types = {
      focused: true,    // Single item attention
      divided: false,   // Multiple items
      sustained: true,  // Maintain over time
      selective: true,  // Choose what to attend
      executive: true   // Control attention
    };
    
    // History
    this.attentionHistory = [];
    this.shiftHistory = [];
    
    // Executive control
    this.inhibitoryControl = options.inhibitoryControl || 0.5;
    this.flexibility = options.flexibility || 0.5;
  }

  // ============================================================================
  // SALIENCE DETECTION - What stands out?
  // ============================================================================
  
  calculateSalience(objects) {
    this.salienceMap = {};
    
    objects.forEach(obj => {
      let salience = 0;
      
      // Motion salience
      if (obj.motion) {
        salience += 0.3 * (obj.motion.speed || 1);
      }
      
      // Novelty salience
      if (obj.novel) {
        salience += 0.4;
      }
      
      // Emotional salience
      if (obj.emotionalValue) {
        salience += 0.5 * obj.emotionalValue;
      }
      
      // Size salience
      if (obj.size) {
        salience += 0.2 * obj.size;
      }
      
      // Proximity salience
      if (obj.distance !== undefined) {
        salience += 0.3 * (1 - Math.min(1, obj.distance));
      }
      
      // Contrast salience
      if (obj.contrast) {
        salience += 0.3 * obj.contrast;
      }
      
      // Social salience (faces, people)
      if (obj.isSocial) {
        salience += 0.4;
      }
      
      // Goal relevance
      if (obj.goalRelevant) {
        salience += 0.5;
      }
      
      // Random novelty
      salience += Math.random() * 0.1;
      
      this.salienceMap[obj.id] = Math.min(1, salience);
    });
    
    return this.salienceMap;
  }

  // ============================================================================
  // FOCUSED ATTENTION - Single item focus
  // ============================================================================
  
  focusOn(item) {
    const previousFocus = this.focusedItem;
    
    // Shift attention
    if (previousFocus !== item.id) {
      this.attentionShifts++;
      this.shiftHistory.push({
        from: previousFocus,
        to: item.id,
        timestamp: Date.now()
      });
      this.lastShiftTime = Date.now();
    }
    
    this.focusedItem = item.id;
    this.resources.available = Math.max(0, this.resources.available - 0.3);
    this.resources.allocated[item.id] = this.focusLevel;
    
    // Record in history
    this.attentionHistory.push({
      type: 'focused',
      item: item.id,
      timestamp: Date.now()
    });
    
    return {
      focused: true,
      item: item.id,
      resourcesRemaining: this.resources.available
    };
  }

  // ============================================================================
  // DIVIDED ATTENTION - Multiple items
  // ============================================================================
  
  divideAttention(items) {
    if (items.length > this.dividedAttentionCapacity) {
      // Can only attend to capacity items
      items = items.slice(0, this.dividedAttentionCapacity);
    }
    
    const resourcePerItem = this.resources.available / items.length;
    
    this.attendedItems = items.map(item => ({
      ...item,
      attention: resourcePerItem
    }));
    
    this.resources.available = 0;
    
    items.forEach(item => {
      this.resources.allocated[item.id] = resourcePerItem;
    });
    
    return {
      divided: true,
      items: items.length,
      attention: resourcePerItem
    };
  }

  // ============================================================================
  // SUSTAINED ATTENTION - Maintain focus over time
  // ============================================================================
  
  sustain(item, duration = 1000) {
    const elapsed = Date.now() - this.lastShiftTime;
    
    // Attention decays over time
    const decay = Math.exp(-elapsed / (duration * 10));
    const sustainedLevel = this.focusLevel * decay;
    
    // Record
    this.attentionHistory.push({
      type: 'sustained',
      item,
      duration: elapsed,
      level: sustainedLevel,
      timestamp: Date.now()
    });
    
    return {
      sustained: true,
      level: sustainedLevel,
      elapsed
    };
  }

  // ============================================================================
  // SELECTIVE ATTENTION - Filter out distractions
  // ============================================================================
  
  select(item, distractions = []) {
    // Calculate suppression for distractions
    const suppression = distractions.map(distraction => {
      const similarity = this.calculateSimilarity(item, distraction);
      const suppressionAmount = similarity * this.inhibitoryControl;
      
      return {
        distraction: distraction.id,
        suppressed: suppressionAmount
      };
    });
    
    // Enhance item attention
    const enhanced = this.focusLevel * (1 + this.inhibitoryControl);
    
    return {
      selected: item.id,
      enhanced,
      suppressed: suppression
    };
  }
  
  calculateSimilarity(item1, item2) {
    let similarity = 0;
    
    // Feature similarity
    if (item1.features && item2.features) {
      const common = item1.features.filter(f => item2.features.includes(f));
      similarity = common.length / Math.max(item1.features.length, item2.features.length);
    }
    
    // Spatial proximity
    if (item1.position && item2.position) {
      const dist = Math.sqrt(
        Math.pow(item1.position.x - item2.position.x, 2) +
        Math.pow(item1.position.y - item2.position.y, 2)
      );
      similarity += Math.max(0, 1 - dist / 100);
    }
    
    return Math.min(1, similarity);
  }

  // ============================================================================
  // EXECUTIVE CONTROL - Direct attention
  // ============================================================================
  
  executiveControl(command) {
    switch(command.type) {
      case 'shift':
        return this.focusOn(command.item);
      
      case 'divide':
        return this.divideAttention(command.items);
      
      case 'sustain':
        return this.sustain(command.item, command.duration);
      
      case 'select':
        return this.select(command.item, command.distractions);
      
      case 'suppress':
        return this.suppress(command.item);
      
      case 'reset':
        return this.reset();
      
      default:
        return { error: 'Unknown command' };
    }
  }
  
  suppress(itemId) {
    const suppressed = this.resources.allocated[itemId];
    if (suppressed) {
      delete this.resources.allocated[itemId];
      this.resources.available += suppressed;
    }
    return { suppressed: true, recovered: suppressed };
  }
  
  reset() {
    const previous = this.focusedItem;
    this.focusedItem = null;
    this.attendedItems = [];
    this.resources.available = 1.0;
    this.resources.allocated = {};
    
    return { reset: true, previous };
  }

  // ============================================================================
  // ATTENTION NETWORK SIMULATION
  // ============================================================================
  
  processScene(objects, goal = null) {
    // Step 1: Calculate salience
    this.calculateSalience(objects);
    
    // Step 2: Apply goal bias
    if (goal) {
      objects.forEach(obj => {
        if (obj.goalRelevant) {
          this.salienceMap[obj.id] += 0.3;
        }
      });
    }
    
    // Step 3: Find most salient
    let maxSalience = 0;
    let mostSalient = null;
    
    objects.forEach(obj => {
      if (this.salienceMap[obj.id] > maxSalience) {
        maxSalience = this.salienceMap[obj.id];
        mostSalient = obj;
      }
    });
    
    // Step 4: Apply attention
    if (mostSalient) {
      this.focusOn(mostSalient);
    }
    
    return {
      salienceMap: this.salienceMap,
      focused: mostSalient?.id,
      salience: maxSalience
    };
  }

  // ============================================================================
  // VIGILANCE - Maintain alertness
  // ============================================================================
  
  maintainVigilance(stimulus, interval = 1000) {
    const elapsed = Date.now() - this.lastShiftTime;
    
    // Vigilance decreases over time
    const vigilance = Math.exp(-elapsed / (interval * 5));
    
    // Response to stimulus
    if (stimulus) {
      const response = {
        detected: true,
        latency: elapsed,
        vigilance
      };
      
      // React
      this.focusOn(stimulus);
      
      return response;
    }
    
    return {
      detected: false,
      vigilance
    };
  }

  // ============================================================================
  // ATTENTION SWITCHING
  // ============================================================================
  
  switchAttention(newTarget) {
    const shiftTime = Date.now() - this.lastShiftTime;
    
    // Cost of switching
    const switchCost = 100 + (shiftTime * 0.1);
    
    const result = this.focusOn(newTarget);
    
    return {
      ...result,
      switchCost,
      previous: this.focusedItem,
      newTarget
    };
  }
  
  setFocusLevel(level) {
    this.focusLevel = Math.max(0.1, Math.min(1, level));
    return { focusLevel: this.focusLevel };
  }

  // ============================================================================
  // STATUS
  // ============================================================================
  
  getStatus() {
    return {
      focused: this.focusedItem,
      attended: this.attendedItems.length,
      shifts: this.attentionShifts,
      resources: {
        total: this.resources.total,
        available: this.resources.available.toFixed(2),
        allocated: Object.keys(this.resources.allocated).length
      },
      lastShift: this.lastShiftTime,
      types: { ...this.types }
    };
  }
  
  getHistory(limit = 20) {
    return this.attentionHistory.slice(-limit);
  }
  
  getSalience() {
    return this.salienceMap;
  }
}

// Export
module.exports = AttentionModule;

// Test
if (require.main === module) {
  const attention = new AttentionModule();
  
  console.log('=== Attention Module Test ===\n');
  
  const objects = [
    { id: 'person', motion: { speed: 0.8 }, emotionalValue: 0.7, goalRelevant: true },
    { id: 'car', motion: { speed: 1.0 }, size: 0.8 },
    { id: 'tree', size: 0.5 }
  ];
  
  console.log('Process scene:');
  console.log(attention.processScene(objects));
  
  console.log('\nFocus:');
  console.log(attention.focusOn(objects[0]));
  
  console.log('\nStatus:');
  console.log(attention.getStatus());
}

module.exports = AttentionModule;
