/**
 * Genome Digital - Chunking Strategy
 * Grouping information for memory efficiency
 * Added: 11 Mar 2026
 */

class ChunkingStrategy {
  constructor() {
    this.chunkSize = 4;
    this.chunks = [];
    this.patterns = new Map();
  }

  chunk(information) {
    if (typeof information === 'string') {
      return this.chunkString(information);
    }
    return this.chunkArray(information);
  }

  chunkString(str) {
    const words = str.split(' ');
    const chunked = [];
    
    for (let i = 0; i < words.length; i += this.chunkSize) {
      chunked.push(words.slice(i, i + this.chunkSize).join(' '));
    }
    
    this.chunks.push(...chunked);
    
    return {
      original: str,
      chunks: chunked,
      chunkCount: chunked.length,
      efficiency: this.calculateEfficiency(str, chunked)
    };
  }

  chunkArray(arr) {
    const chunked = [];
    for (let i = 0; i < arr.length; i += this.chunkSize) {
      chunked.push(arr.slice(i, i + this.chunkSize));
    }
    
    return {
      original: arr,
      chunks: chunked,
      chunkCount: chunked.length
    };
  }

  calculateEfficiency(original, chunked) {
    return (original.length / chunked.length).toFixed(2);
  }

  recognizePattern(data) {
    const pattern = data.slice(0, 3);
    this.patterns.set(pattern.join(''), data.length);
    return { pattern, recognized: true };
  }

  setChunkSize(size) {
    this.chunkSize = Math.max(1, Math.min(10, size));
    return { chunkSize: this.chunkSize };
  }
}

module.exports = ChunkingStrategy;
