#!/usr/bin/env node
/**
 * Project Genome Digital - DNA Digital Memory System
 * Encodes, decodes, stores, searches and compresses information in DNA format
 */

const fs = require('fs');
const path = require('path');

const NUCLEOTIDES = ['A', 'T', 'G', 'C'];
const STORE_DIR = path.join(__dirname, 'genome-store');

// Encode text to DNA sequence (4 nucleotides per byte)
function hexToNucleotides(hex) {
  let result = '';
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.substr(i, 2), 16);
    result += NUCLEOTIDES[(byte >> 6) & 3];
    result += NUCLEOTIDES[(byte >> 4) & 3];
    result += NUCLEOTIDES[(byte >> 2) & 3];
    result += NUCLEOTIDES[byte & 3];
  }
  return result;
}

function nucleotidesToHex(seq) {
  let hex = '';
  for (let i = 0; i < seq.length; i += 4) {
    const chunk = seq.substr(i, 4);
    let byte = 0;
    for (let j = 0; j < 4; j++) {
      const idx = NUCLEOTIDES.indexOf(chunk[j]);
      if (idx === -1) return null;
      byte = (byte << 2) | idx;
    }
    hex += byte.toString(16).padStart(2, '0');
  }
  return hex;
}

// Compressed encoding (3 nucleotides per byte)
function compressToNucleotides(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  let result = '';
  let binStr = bytes.map(b => b.toString(2).padStart(8, '0')).join('');
  while (binStr.length % 6 !== 0) binStr += '0';
  
  for (let i = 0; i < binStr.length; i += 6) {
    const val = parseInt(binStr.substr(i, 6), 2);
    result += NUCLEOTIDES[Math.floor(val / 16) % 4];
    result += NUCLEOTIDES[Math.floor(val / 4) % 4];
    result += NUCLEOTIDES[val % 4];
  }
  return result;
}

function decompressFromNucleotides(seq) {
  let binStr = '';
  for (const nuc of seq) {
    const idx = NUCLEOTIDES.indexOf(nuc);
    if (idx === -1) return null;
    binStr += idx.toString(2).padStart(2, '0');
  }
  while (binStr.length % 8 !== 0) binStr += '0';
  
  let hex = '';
  for (let i = 0; i < binStr.length; i += 8) {
    hex += parseInt(binStr.substr(i, 8), 2).toString(16).padStart(2, '0');
  }
  return hex;
}

function encode(text, compressed = false) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return compressed ? compressToNucleotides(hex) : hexToNucleotides(hex);
}

function decode(seq, compressed = false) {
  const hex = compressed ? decompressFromNucleotides(seq) : nucleotidesToHex(seq);
  if (!hex) return null;
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return new TextDecoder().decode(new Uint8Array(bytes));
}

function createGenome(data, name, keywords = [], options = {}) {
  const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const compressed = options.compressed || false;
  const encoded = encode(content, compressed);
  const checksum = encoded.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 10000;
  
  return {
    name,
    keywords,
    type: options.type || 'memory',
    compressed,
    created: new Date().toISOString(),
    originalLength: content.length,
    encodedLength: encoded.length,
    checksum,
    sequence: encoded
  };
}

function extractGenome(genome) {
  if (!genome.sequence) return null;
  return decode(genome.sequence, genome.compressed);
}

function ensureStoreDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
  if (!fs.existsSync(path.join(STORE_DIR, 'memories'))) {
    fs.mkdirSync(path.join(STORE_DIR, 'memories'), { recursive: true });
  }
}

function saveGenome(genome) {
  ensureStoreDir();
  const filename = `${Date.now()}-${genome.name.replace(/[^a-z0-9]/gi, '-')}.json`;
  const filepath = path.join(STORE_DIR, 'memories', filename);
  fs.writeFileSync(filepath, JSON.stringify(genome, null, 2));
  return { filename, filepath };
}

function loadGenome(filename) {
  const filepath = path.join(STORE_DIR, 'memories', filename);
  if (!fs.existsSync(filepath)) return null;
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

function search(query) {
  const memDir = path.join(STORE_DIR, 'memories');
  if (!fs.existsSync(memDir)) return [];
  
  const files = fs.readdirSync(memDir);
  const results = [];
  const q = query.toLowerCase();
  
  files.forEach(file => {
    if (!file.endsWith('.json')) return;
    const genome = loadGenome(file);
    if (genome && (
      genome.name.toLowerCase().includes(q) ||
      genome.keywords.some(k => k.toLowerCase().includes(q))
    )) {
      results.push(genome);
    }
  });
  return results;
}

function getAllGenomes() {
  const memDir = path.join(STORE_DIR, 'memories');
  if (!fs.existsSync(memDir)) return [];
  return fs.readdirSync(memDir).filter(f => f.endsWith('.json')).map(loadGenome);
}

module.exports = { 
  encode, decode, createGenome, extractGenome,
  saveGenome, loadGenome, search, getAllGenomes,
  ensureStoreDir
};
