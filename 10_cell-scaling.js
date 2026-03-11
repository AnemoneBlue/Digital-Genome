/**
 * 🧬 Cell Scaling System
 * Handles 37 trillion cells simulation
 */

class CellScalingSystem {
  constructor() {
    this.totalCells = 37 * Math.pow(10, 12); // 37 trillion
    this.cellTypes = this.initializeCellTypes();
    this.organs = {};
    this.tissues = {};
  }

  initializeCellTypes() {
    return {
      neurons: { count: 1.2e11, color: '#FF6B6B' },           // Brain
      redBloodCells: { count: 2.5e13, color: '#FF0000' },      // Blood
      whiteBloodCells: { count: 7e9, color: '#FFFFFF' },       // Immune
      platelets: { count: 2.5e11, color: '#FFD93D' },        // Blood
      skinCells: { count: 2e12, color: '#FFEAA7' },           // Skin
      liverCells: { count: 1e11, color: '#8B4513' },          // Liver
      heartCells: { count: 2e9, color: '#E74C3C' },          // Heart
      muscleCells: { count: 1e12, color: '#DC143C' },         // Muscles
      kidneyCells: { count: 1e9, color: '#8B0000' },          // Kidneys
      lungCells: { count: 5e11, color: '#FFB6C1' },           // Lungs
      intestinalCells: { count: 3e11, color: '#FFA07A' },     // Gut
      boneCells: { count: 1e12, color: '#F5F5DC' },           // Bones
      fatCells: { count: 3e10, color: '#FFEFD5' },           // Fat
      pancreaticCells: { count: 1e9, color: '#FF7F50' },     // Pancreas
      immuneCells: { count: 7e9, color: '#98FB98' }          // Immune
    };
  }

  getCellCount(type) {
    return this.cellTypes[type]?.count || 0;
  }

  getTotalCells() {
    return this.totalCells;
  }

  getCellDistribution() {
    const dist = {};
    for (const [type, data] of Object.entries(this.cellTypes)) {
      dist[type] = {
        count: data.count,
        percentage: (data.count / this.totalCells * 100).toFixed(6) + '%'
      };
    }
    return dist;
  }

  simulateCellDivision(type, rate) {
    const baseCount = this.cellTypes[type].count;
    const newCells = baseCount * rate;
    this.cellTypes[type].count += newCells;
    return newCells;
  }

  simulateCellDeath(type, rate) {
    const baseCount = this.cellTypes[type].count;
    const deadCells = baseCount * rate;
    this.cellTypes[type].count = Math.max(0, baseCount - deadCells);
    return deadCells;
  }

  getCellHealth(type) {
    return {
      type,
      count: this.cellTypes[type].count,
      energy: Math.random() * 100,
      age: Math.random() * 100,
      mutationRate: Math.random() * 0.001
    };
  }

  // Cell metabolism simulation
  calculateMetabolism(cellType) {
    const baseMetabolism = {
      neurons: 0.25,      // High energy demand
      redBloodCells: 0.08,
      muscleCells: 0.5,  // Very high when active
      liverCells: 0.35,
      heartCells: 0.4,
      immuneCells: 0.3
    };
    return baseMetabolism[cellType] || 0.1;
  }

  // Oxygen consumption simulation
  calculateOxygenNeed() {
    let totalO2 = 0;
    for (const [type, data] of Object.entries(this.cellTypes)) {
      totalO2 += data.count * this.calculateMetabolism(type);
    }
    return totalO2; // mL O2 per day equivalent
  }
}

module.exports = new CellScalingSystem();
