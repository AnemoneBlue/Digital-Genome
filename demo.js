/**
 * Genome Digital - Demo Runner
 * Tests the digital mind
 * Run: node demo.js
 */

const fs = require('fs');
const path = require('path');

console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║                    🧬 GENOME DIGITAL DEMO 🧬                           ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝');
console.log();

// Test various modules
const testModule = (name, module) => {
  try {
    const instance = new module();
    console.log(`✅ ${name}`);
    return instance;
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
    return null;
  }
};

console.log('📦 Loading modules...\n');

// Core modules
const tests = [
  ['Consciousness', require('./100_consciousness-integration')],
  ['Memory', require('./30_long-term-memory')],
  ['Emotion', require('./18_emotional-processing')],
  ['Reasoning', require('./42_reasoning-module')],
  ['Learning', require('./29_learning-system')],
  ['Creativity', require('./15_creativity-engine')],
  ['Attention', require('./74_attention-system')],
  ['Dream', require('./16_dream-narrator')],
  ['Imagination', require('./25_imagination-module')],
  ['Self-Awareness', require('./45_self-awareness')],
];

tests.forEach(([name, module]) => testModule(name, module));

console.log('\n🧠 Testing cognitive functions...\n');

// Test functions
try {
  const Reasoning = require('./42_reasoning-module');
  const reasoner = new Reasoning();
  const result = reasoner.analyze('Why is the sky blue?');
  console.log('🧠 Reasoning:', result.approach);
} catch (e) {
  console.log('⚠️ Reasoning test skipped');
}

try {
  const Emotion = require('./18_emotional-processing');
  const emotion = new Emotion();
  const result = emotion.process('good news');
  console.log('❤️ Emotion:', result.type);
} catch (e) {
  console.log('⚠️ Emotion test skipped');
}

try {
  const Dream = require('./16_dream-narrator');
  const dream = new Dream();
  const result = dream.narrate();
  console.log('😴 Dream:', result.dream.substring(0, 50) + '...');
} catch (e) {
  console.log('⚠️ Dream test skipped');
}

console.log('\n✨ Testing final integration...\n');

try {
  const Finale = require('./200_genome-digital-finale');
  const genomeDigital = new Finale();
  
  console.log(genomeDigital.introduce());
  console.log('\n🎯 Status:');
  console.log(JSON.stringify(genomeDigital.getStatus(), null, 2));
  
} catch (e) {
  console.log('❌ Finale error:', e.message);
}

console.log('\n═══════════════════════════════════════════════════════════════════════════');
console.log('🎉 DEMO COMPLETE!');
console.log('═══════════════════════════════════════════════════════════════════════════');
