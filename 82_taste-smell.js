/**
 * Genome Digital - Taste and Smell
 * Chemical senses processing
 * Added: 11 Mar 2026
 */

class TasteSmellModule {
  constructor() {
    this.tastes = ['sweet', 'salty', 'sour', 'bitter', 'umami'];
    this.smells = [];
  }

  processTaste(molecule) {
    return {
      molecule,
      taste: this.tastes[Math.floor(Math.random() * this.tastes.length)],
      intensity: Math.random()
    };
  }

  processSmell(molecule) {
    const smell = {
      molecule,
      category: ['floral', 'fruity', 'earthy', 'chemical', 'organic'][Math.floor(Math.random() * 5)],
      intensity: Math.random(),
      timestamp: Date.now()
    };
    this.smells.push(smell);
    return smell;
  }

  combineSenses(taste, smell) {
    return {
      taste,
      smell,
      flavor: `${taste.taste} with ${smell.category} notes`,
      pleasantness: Math.random()
    };
  }
}

module.exports = TasteSmellModule;
