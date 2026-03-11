/**
 * Genome Digital - Pattern Recognition
 * Identifying recurring structures in data
 * Added: 11 Mar 2026
 */

class PatternRecognition {
  constructor() {
    this.patterns = new Map();
    this.sequences = [];
    this.confidence = 0.8;
  }

  findPattern(data) {
    if (this.isNumeric(data)) {
      return this.findNumericPattern(data);
    }
    if (this.isSequential(data)) {
      return this.findSequentialPattern(data);
    }
    return this.findGeneralPattern(data);
  }

  isNumeric(data) {
    return Array.isArray(data) && data.every(d => typeof d === 'number');
  }

  isSequential(data) {
    return Array.isArray(data) && data.length > 2;
  }

  findNumericPattern(numbers) {
    const diffs = [];
    for (let i = 1; i < numbers.length; i++) {
      diffs.push(numbers[i] - numbers[i - 1]);
    }
    
    const allSame = diffs.every(d => d === diffs[0]);
    if (allSame) {
      return { type: 'arithmetic', difference: diffs[0], confidence: 0.9 };
    }
    
    const ratios = [];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i - 1] !== 0) {
        ratios.push(numbers[i] / numbers[i - 1]);
      }
    }
    
    const allSameRatio = ratios.every(r => Math.abs(r - ratios[0]) < 0.01);
    if (allSameRatio) {
      return { type: 'geometric', ratio: ratios[0], confidence: 0.9 };
    }
    
    return { type: 'complex', confidence: 0.3 };
  }

  findSequentialPattern(sequence) {
    const pattern = sequence.slice(0, 3);
    const repeated = sequence.join('').includes(pattern.join(''));
    
    return {
      type: repeated ? 'repeating' : 'unique',
      pattern,
      confidence: repeated ? 0.8 : 0.4
    };
  }

  findGeneralPattern(data) {
    const frequency = {};
    data.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });
    
    const mostCommon = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])[0];
    
    return {
      type: 'frequency',
      mostCommon,
      frequency,
      confidence: 0.7
    };
  }

  learnPattern(name, pattern) {
    this.patterns.set(name, {
      pattern,
      learnedAt: Date.now(),
      occurrences: 0
    });
    return { learned: name };
  }

  recognize(name, data) {
    const learned = this.patterns.get(name);
    if (!learned) return { recognized: false };
    
    const match = this.findPattern(data);
    learned.occurrences++;
    
    return {
      recognized: match.confidence > 0.5,
      match,
      pattern: learned
    };
  }
}

module.exports = PatternRecognition;
