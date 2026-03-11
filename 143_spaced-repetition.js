/**
 * Genome Digital - Spaced Repetition
 * Optimizing memory consolidation over time
 * Added: 11 Mar 2026
 */

class SpacedRepetition {
  constructor() {
    this.intervals = [1, 3, 7, 14, 30, 60]; // days
    this.reviews = [];
    this.cards = new Map();
  }

  createCard(front, back) {
    const card = {
      id: Date.now(),
      front,
      back,
      nextReview: Date.now(),
      intervalIndex: 0,
      easeFactor: 2.5,
      repetitions: 0
    };
    
    this.cards.set(card.id, card);
    return card;
  }

  review(cardId, quality) {
    const card = this.cards.get(cardId);
    if (!card) return { error: 'Card not found' };
    
    const reviewed = {
      cardId,
      quality,
      timestamp: Date.now(),
      previousInterval: this.intervals[card.intervalIndex]
    };
    
    if (quality >= 3) {
      if (card.repetitions === 0) {
        card.intervalIndex = 1;
      } else if (card.repetitions === 1) {
        card.intervalIndex = 2;
      } else {
        card.intervalIndex = Math.min(
          this.intervals.length - 1,
          card.intervalIndex + 1
        );
      }
      
      card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    } else {
      card.intervalIndex = 0;
      card.repetitions = 0;
    }
    
    const nextInterval = this.intervals[card.intervalIndex];
    card.nextReview = Date.now() + nextInterval * 24 * 60 * 60 * 1000;
    card.repetitions++;
    
    this.reviews.push(reviewed);
    
    return {
      ...reviewed,
      nextReview: card.nextReview,
      interval: nextInterval,
      easeFactor: card.easeFactor
    };
  }

  getDueCards() {
    const now = Date.now();
    const due = [];
    
    for (const [id, card] of this.cards) {
      if (card.nextReview <= now) {
        due.push(card);
      }
    }
    
    return due;
  }

  getStats() {
    const totalCards = this.cards.size;
    const dueCount = this.getDueCards().length;
    const totalReviews = this.reviews.length;
    
    return {
      totalCards,
      dueCount,
      totalReviews,
      averageEase: Array.from(this.cards.values())
        .reduce((sum, c) => sum + c.easeFactor, 0) / totalCards || 0
    };
  }
}

module.exports = SpacedRepetition;
