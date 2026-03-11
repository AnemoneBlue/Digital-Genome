/**
 * Genome Digital - Element Database
 * All chemical elements in the human body
 */

const ELEMENTS = {
  // Major elements (99.9% of body)
  Oxygen: { symbol: 'O', atomicNumber: 8, percentage: 65 },
  Carbon: { symbol: 'C', atomicNumber: 6, percentage: 18 },
  Hydrogen: { symbol: 'H', atomicNumber: 1, percentage: 10 },
  Nitrogen: { symbol: 'N', atomicNumber: 7, percentage: 3 },
  
  // Major minerals (1.5%)
  Calcium: { symbol: 'Ca', atomicNumber: 20, percentage: 1.5 },
  Phosphorus: { symbol: 'P', atomicNumber: 15, percentage: 1.0 },
  
  // Trace minerals (0.5%)
  Potassium: { symbol: 'K', atomicNumber: 19, percentage: 0.35 },
  Sulfur: { symbol: 'S', atomicNumber: 16, percentage: 0.25 },
  Sodium: { symbol: 'Na', atomicNumber: 11, percentage: 0.15 },
  Chlorine: { symbol: 'Cl', atomicNumber: 17, percentage: 0.15 },
  
  // Ultra-trace elements
  Iron: { symbol: 'Fe', atomicNumber: 26, percentage: 0.006 },
  Zinc: { symbol: 'Zn', atomicNumber: 30, percentage: 0.003 },
  Copper: { symbol: 'Cu', atomicNumber: 29, percentage: 0.0001 }
};

const AMINO_ACIDS = [
  { name: 'Alanine', code: 'A' },
  { name: 'Arginine', code: 'R' },
  { name: 'Asparagine', code: 'N' },
  { name: 'Aspartic acid', code: 'D' },
  { name: 'Cysteine', code: 'C' },
  { name: 'Glutamine', code: 'Q' },
  { name: 'Glutamic acid', code: 'E' },
  { name: 'Glycine', code: 'G' },
  { name: 'Histidine', code: 'H' },
  { name: 'Isoleucine', code: 'I' },
  { name: 'Leucine', code: 'L' },
  { name: 'Lysine', code: 'K' },
  { name: 'Methionine', code: 'M' },
  { name: 'Phenylalanine', code: 'F' },
  { name: 'Proline', code: 'P' },
  { name: 'Serine', code: 'S' },
  { name: 'Threonine', code: 'T' },
  { name: 'Tryptophan', code: 'W' },
  { name: 'Tyrosine', code: 'Y' },
  { name: 'Valine', code: 'V' }
];

module.exports = { ELEMENTS, AMINO_ACIDS };
