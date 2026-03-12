/**
 * Genome Digital - Attention Module
 * Controls focus and attention allocation
 * Added: 12 Mar 2026
 */

class AttentionModule {
  constructor() {
    this.focusLevel = 0.5;
    this.attendedObject = null;
    this.attentionShifts = 0;
    this.attentionalResources = 1.0;
    this.salienceMap = {};
  }

  // Calculate salience of objects in environment
  calculateSalience(objects) {
    objects.forEach(obj => {
      let salience = 0;

      // Motion increases salience
      if (obj.motion) salience += 0.3;
      
      // Novelty increases salience
      if (obj.novel) salience += 0.3;
      
      // Emotional significance
      if (obj.emotionalValue) salience += obj.emotionalValue * 0.4;
      
      // Size
      if (obj.size) salience += obj.size * 0.2;
      
      // Proximity
      if (obj.distance) salience += (1 - obj.distance) * 0.3;

      this.salienceMap[obj.id] = Math.min(1, salience);
    });

    return this.salienceMap;
  }

  // Select most salient object to attend
  attend(objects) {
    this.calculateSalience(objects);

    let maxSalience = 0;
    let selected = null;

    objects.forEach(obj => {
      if (this.salienceMap[obj.id] > maxSalience) {
        maxSalience = this.salienceMap[obj.id];
        selected = obj;
      }
    });

    if (selected && selected.id !== this.attendedObject) {
      this.attendedObject = selected.id;
      this.attentionShifts++;
    }

    // Allocate resources based on focus
    this.attentionalResources = this.focusLevel;

    return {
      attended: selected,
      salience: maxSalience,
      focusLevel: this.focusLevel
    };
  }

  // Shift attention
  shiftAttention(newTarget) {
    this.attendedObject = newTarget;
    this.attentionShifts++;
    
    return { shifted: true, newTarget, shifts: this.attentionShifts };
  }

  // Set focus level (0-1)
  setFocus(level) {
    this.focusLevel = Math.max(0, Math.min(1, level));
    this.attentionalResources = this.focusLevel;
    
    return { focusLevel: this.focusLevel };
  }

  // Divide attention (multitasking)
  divideAttention(objects) {
    const allocation = objects.map((obj, index) => ({
      object: obj.id,
      resource: this.attentionalResources / objects.length
    }));

    return { divided: true, allocation };
  }

  // Get attentional resources
  getResources() {
    return {
      level: this.attentionalResources,
      available: 1 - this.attentionalResources,
      focused: this.attendedObject !== null
    };
  }

  getStatus() {
    return {
      focusLevel: this.focusLevel,
      attendedObject: this.attendedObject,
      attentionShifts: this.attentionShifts,
      resources: this.attentionalResources
    };
  }
}

module.exports = AttentionModule;
