/**
 * Genome Digital - Cellular Simulation Module
 * Simulates human cells
 */

const CELL_TYPES = {
  NEURON: 'neuron',
  ASTROCYTE: 'astrocyte',
  ERYTHROCYTE: 'erythrocyte',
  LEUKOCYTE: 'leukocyte',
  MUSCLE: 'muscle'
};

const CELL_STATES = {
  ALIVE: 'alive',
  DIVIDING: 'dividing',
  APOPTOSIS: 'apoptosis',
  NECROSIS: 'necrosis'
};

class Cell {
  constructor(type, id, dna) {
    this.id = id;
    this.type = type;
    this.dna = dna;
    this.state = CELL_STATES.ALIVE;
    this.age = 0;
    this.health = 100;
    this.organelle = {
      mitochondria: Math.floor(Math.random() * 2000) + 500,
      ribosomes: Math.floor(Math.random() * 10000) + 5000
    };
    this.position = { x: 0, y: 0, z: 0 };
    this.connections = [];
    this.createdAt = Date.now();
  }
  
  metabolize(nutrients) {
    if (this.state !== CELL_STATES.ALIVE) return;
    this.health = Math.min(100, this.health + nutrients.oxygen * 0.1);
    this.age += 1;
  }
  
  divide() {
    if (this.health < 50) return null;
    this.state = CELL_STATES.DIVIDING;
    const daughter = new Cell(this.type, `${this.id}-${Date.now()}`, this.dna);
    daughter.organelle.mitochondria = Math.floor(this.organelle.mitochondria / 2);
    this.state = CELL_STATES.ALIVE;
    return daughter;
  }
  
  die(method = 'apoptosis') {
    this.state = method === 'apoptosis' ? CELL_STATES.APOPTOSIS : CELL_STATES.NECROSIS;
  }
  
  toDNA() {
    return encodeToDNA(JSON.stringify({ t: this.type, h: this.health, a: this.age }));
  }
}

class Tissue {
  constructor(name, type) {
    this.name = name;
    this.cellType = type;
    this.cells = new Map();
  }
  
  addCell(cell) { this.cells.set(cell.id, cell); }
  removeCell(cellId) { this.cells.delete(cellId); }
  getCell(cellId) { return this.cells.get(cellId); }
  getHealthyCells() {
    return Array.from(this.cells.values()).filter(c => c.health > 70);
  }
  getAverageHealth() {
    const cells = Array.from(this.cells.values());
    if (cells.length === 0) return 0;
    return cells.reduce((acc, c) => acc + c.health, 0) / cells.length;
  }
  tick(nutrients) {
    this.cells.forEach(cell => {
      cell.metabolize(nutrients);
      if (Math.random() < 0.001 && cell.state === CELL_STATES.ALIVE) {
        const daughter = cell.divide();
        if (daughter) this.addCell(daughter);
      }
      if (cell.health <= 0) cell.die();
    });
  }
  size() { return this.cells.size; }
}

class Organ {
  constructor(name) {
    this.name = name;
    this.tissues = new Map();
  }
  addTissue(tissue) { this.tissues.set(tissue.name, tissue); }
  getTotalCells() {
    let total = 0;
    this.tissues.forEach(t => total += t.size());
    return total;
  }
}

function encodeToDNA(str) {
  const dna = [];
  for (let i = 0; i < str.length; i++) {
    dna.push(['A', 'T', 'G', 'C'][str.charCodeAt(i) % 4]);
  }
  return dna.join('');
}

module.exports = { CELL_TYPES, CELL_STATES, Cell, Tissue, Organ };
