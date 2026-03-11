/**
 * Genome Digital - Active Recall
 * Memory retrieval practice - the testing effect
 * Added: 11 Mar 2026
 */

class ActiveRecall {
  constructor() {
    this.questions = [];
    this.answers = new Map();
    this.recallStrength = new Map();
  }

  createQuestion(question, answer, context = '') {
    const q = {
      id: Date.now(),
      question,
      answer,
      context,
      created: Date.now(),
      asked: 0,
      correct: 0
    };
    
    this.questions.push(q);
    this.answers.set(q.id, answer);
    this.recallStrength.set(q.id, 0.5);
    
    return q;
  }

  attemptAnswer(questionId, attempt) {
    const correctAnswer = this.answers.get(questionId);
    const isCorrect = this.normalize(attempt) === this.normalize(correctAnswer);
    
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.asked++;
      if (isCorrect) question.correct++;
      
      const strength = this.recallStrength.get(questionId);
      this.recallStrength.set(questionId, Math.min(1, strength + (isCorrect ? 0.1 : -0.1)));
    }
    
    return {
      questionId,
      attempt,
      correct: isCorrect,
      strength: this.recallStrength.get(questionId)
    };
  }

  normalize(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  }

  getRecallStrength(questionId) {
    return {
      questionId,
      strength: this.recallStrength.get(questionId) || 0,
      asked: this.questions.find(q => q.id === questionId)?.asked || 0
    };
  }

  getWeakQuestions(threshold = 0.5) {
    return this.questions.filter(q => 
      (this.recallStrength.get(q.id) || 0) < threshold
    );
  }

  generateQuiz(count = 5) {
    const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(q => ({
      id: q.id,
      question: q.question,
      context: q.context
    }));
  }
}

module.exports = ActiveRecall;
