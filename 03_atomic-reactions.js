/**
 * Genome Digital - Atomic Reactions Module
 * Simulates chemical reactions
 */

const ATOMIC_PROPERTIES = {
  H: { atomicNumber: 1, mass: 1.008, electronegativity: 2.20 },
  C: { atomicNumber: 6, mass: 12.011, electronegativity: 2.55 },
  N: { atomicNumber: 7, mass: 14.007, electronegativity: 3.04 },
  O: { atomicNumber: 8, mass: 15.999, electronegativity: 3.44 },
  P: { atomicNumber: 15, mass: 30.974, electronegativity: 2.19 },
  S: { atomicNumber: 16, mass: 32.065, electronegativity: 2.58 }
};

class Atom {
  constructor(symbol, position = { x: 0, y: 0, z: 0 }) {
    this.symbol = symbol;
    this.position = position;
    this.velocity = { x: 0, y: 0, z: 0 };
    const props = ATOMIC_PROPERTIES[symbol] || {};
    this.atomicNumber = props.atomicNumber || 1;
    this.mass = props.mass || 1;
    this.electronegativity = props.electronegativity || 2.1;
    this.ionized = false;
    this.ionCharge = 0;
  }
  
  applyForce(fx, fy, fz) {
    this.velocity.x += fx / this.mass;
    this.velocity.y += fy / this.mass;
    this.velocity.z += fz / this.mass;
  }
  
  move(dt = 1) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.z += this.velocity.z * dt;
  }
  
  toDNA() {
    return encodeToDNA(JSON.stringify({ s: this.symbol, p: this.position }));
  }
}

class Molecule {
  constructor(formula, atoms = []) {
    this.formula = formula;
    this.atoms = atoms;
    this.bonds = [];
    this.position = { x: 0, y: 0, z: 0 };
  }
  
  addAtom(atom) { this.atoms.push(atom); }
  
  bond(atom1Index, atom2Index, type = 'single') {
    this.bonds.push({ atom1: atom1Index, atom2: atom2Index, type, energy: type === 'single' ? 347 : 614 });
  }
  
  getEnergy() {
    return this.bonds.reduce((sum, b) => sum + b.energy, 0);
  }
  
  toDNA() {
    return encodeToDNA(JSON.stringify({ f: this.formula, e: this.getEnergy() }));
  }
}

class Reaction {
  constructor(name) {
    this.name = name;
    this.reactants = [];
    this.products = [];
    this.activationEnergy = 0;
    this.rate = 0;
    this.temperature = 298;
  }
  
  addReactant(molecule, coefficient = 1) {
    this.reactants.push({ molecule, coefficient });
  }
  
  addProduct(molecule, coefficient = 1) {
    this.products.push({ molecule, coefficient });
  }
  
  shouldReact() {
    const k = this.rate * Math.exp(-this.activationEnergy / (8.314 * this.temperature));
    return Math.random() < k;
  }
  
  execute() {
    if (this.shouldReact()) {
      return { success: true, products: this.products.map(p => p.molecule) };
    }
    return { success: false };
  }
  
  toDNA() {
    return encodeToDNA(JSON.stringify({ n: this.name, ae: this.activationEnergy }));
  }
}

function encodeToDNA(str) {
  const dna = [];
  for (let i = 0; i < str.length; i++) {
    dna.push(['A', 'T', 'G', 'C'][str.charCodeAt(i) % 4]);
  }
  return dna.join('');
}

module.exports = { ATOMIC_PROPERTIES, Atom, Molecule, Reaction };
