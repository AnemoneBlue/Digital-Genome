/**
 * Genome Digital - Time Perception Module
 * How the digital brain experiences and understands time
 * Added: 9 Mar 2026
 */

class TimePerception {
  constructor() {
    this.perceivedTime = 0; // subjective time
    this.actualTime = Date.now();
    this.timeDilation = 1.0;
    this.memories = [];
    this.future = [];
  }

  // Update subjective time
  tick() {
    this.actualTime = Date.now();
    this.perceivedTime += this.timeDilation;
    return {
      perceived: this.perceivedTime,
      actual: this.actualTime,
      ratio: this.perceivedTime / (this.actualTime % 10000)
    };
  }

  // Time flies when having fun
  setDilatation(emotion) {
    if (emotion.joy > 0.7) this.timeDilation = 0.5; // time speeds up
    else if (emotion.fear > 0.7) this.timeDilation = 2.0; // time slows down
    else this.timeDilation = 1.0;
    return this.timeDilation;
  }

  // Create memory timestamp
  stampMemory(content) {
    this.memories.push({
      content,
      timestamp: this.perceivedTime,
      emotionalWeight: 1.0
    });
  }

  // Plan future
  anticipate(event, timeFromNow) {
    this.future.push({
      event,
      timeFromNow,
      anticipatedAt: this.perceivedTime + timeFromNow
    });
  }

  // Get time estimate
  estimateDuration(start, end) {
    const duration = end - start;
    const subjective = duration * this.timeDilation;
    return { actual: duration, subjective };
  }
}

module.exports = TimePerception;
