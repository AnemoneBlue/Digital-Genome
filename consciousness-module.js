/**
 * Genome Digital - Consciousness Module
 * Manages conscious experience
 * Added: 12 Mar 2026
 */

class ConsciousnessModule {
  constructor() {
    this.level = 0.5;
    this.contents = [];
    this.access = [];
    this.phenomenal = [];
  }

  // Set consciousness level
  setLevel(level) {
    this.level = Math.max(0, Math.min(1, level));
    return { level: this.level };
  }

  // Get current consciousness level
  getLevel() {
    return this.level;
  }

  // Add to consciousness
  addContent(content) {
    const item = {
      id: Date.now(),
      content,
      attention: 1.0,
      timestamp: Date.now()
    };

    this.contents.push(item);
    this.access.push(item);

    return { contentAdded: true };
  }

  // Focus attention
  focus(contentId) {
    const item = this.contents.find(c => c.id === contentId);
    if (item) {
      item.attention = 1.0;
      // Reduce attention on others
      this.contents.forEach(c => {
        if (c.id !== contentId) {
          c.attention *= 0.5;
        }
      });
    }

    return { focused: true };
  }

  // Generate phenomenal experience
  generatePhenomenalExperience() {
    const experience = {
      id: Date.now(),
      qualia: this.generateQualia(),
      timestamp: Date.now()
    };

    this.phenomenal.push(experience);
    return experience;
  }

  // Generate qualia (subjective experience)
  generateQualia() {
    const qualiaTypes = ['redness', 'warmth', 'pain', 'pleasure', 'sound', 'shape'];
    return {
      type: qualiaTypes[Math.floor(Math.random() * qualiaTypes.length)],
      intensity: Math.random(),
      valence: Math.random() > 0.5 ? 'positive' : 'negative'
    };
  }

  // Access consciousness (report on contents)
  accessConsciousness() {
    return {
      level: this.level,
      contents: this.contents.slice(-5),
      report: this.generateReport()
    };
  }

  // Generate report
  generateReport() {
    if (this.contents.length === 0) {
      return 'No conscious contents';
    }

    const recent = this.contents.slice(-3).map(c => c.content);
    return `Aware of: ${recent.join(', ')}`;
  }

  // Get current contents
  getContents() {
    return this.contents;
  }

  // Get phenomenal experiences
  getPhenomenal() {
    return this.phenomenal;
  }

  getStatus() {
    return {
      level: this.level,
      contents: this.contents.length,
      access: this.access.length,
      phenomenal: this.phenomenal.length
    };
  }
}

module.exports = ConsciousnessModule;
