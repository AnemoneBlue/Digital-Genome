/**
 * Genome Digital - Time Perception Module
 * Manages temporal perception and time-based decisions
 * Added: 12 Mar 2026
 */

class TimePerception {
  constructor() {
    this.currentTime = Date.now();
    this.internalClock = 0;
    this.timeEstimates = [];
    this.temporalMemories = [];
    this.sequences = [];
  }

  // Update internal clock
  tick() {
    this.internalClock++;
    this.currentTime = Date.now();
    return { tick: this.internalClock, realTime: this.currentTime };
  }

  // Estimate duration
  estimateDuration(startTime, endTime) {
    const duration = endTime - startTime;
    const estimate = {
      actual: duration,
      internal: this.internalClock - startTime,
      ratio: duration / (this.internalClock - startTime || 1)
    };

    this.timeEstimates.push(estimate);
    return estimate;
  }

  // Perceive time passage
  perceiveTimePassage(duration) {
    let perception = 'moment';

    if (duration > 1000) perception = 'short';
    if (duration > 5000) perception = 'medium';
    if (duration > 30000) perception = 'long';
    if (duration > 300000) perception = 'very_long';

    return { duration, perception };
  }

  // Sequence events
  sequenceEvents(events) {
    const sequence = {
      id: Date.now(),
      events: events.map((e, i) => ({ order: i, ...e })),
      duration: events.length > 1 ? 
        events[events.length - 1].timestamp - events[0].timestamp : 0
    };

    this.sequences.push(sequence);
    return sequence;
  }

  // Store temporal memory
  rememberTemporal(memory) {
    const temporalMemory = {
      id: Date.now(),
      content: memory.content,
      timestamp: memory.timestamp,
      duration: memory.duration || 0,
      order: this.temporalMemories.length
    };

    this.temporalMemories.push(temporalMemory);
    return temporalMemory;
  }

  // Recall in order
  recallInOrder(startTime, endTime) {
    return this.temporalMemories.filter(m => 
      m.timestamp >= startTime && m.timestamp <= endTime
    ).sort((a, b) => a.order - b.order);
  }

  // Get current time
  now() {
    return {
      timestamp: this.currentTime,
      internal: this.internalClock
    };
  }

  // Get elapsed time
  elapsed(startTimestamp) {
    return this.currentTime - startTimestamp;
  }

  // Get sequences
  getSequences() {
    return this.sequences;
  }

  // Get temporal memories
  getMemories() {
    return this.temporalMemories;
  }

  getStatus() {
    return {
      internalClock: this.internalClock,
      estimates: this.timeEstimates.length,
      sequences: this.sequences.length,
      temporalMemories: this.temporalMemories.length
    };
  }
}

module.exports = TimePerception;
