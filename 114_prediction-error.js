/**
 * Genome Digital - Prediction Error
 * Learning from prediction mistakes - the key to all learning
 * Added: 11 Mar 2026
 */

class PredictionError {
  constructor() {
    this.errors = [];
    this.errorSignals = [];
    this.learningRate = 0.1;
    this.totalError = 0;
  }

  detectError(predicted, actual) {
    const error = Math.abs(predicted - actual);
    const sign = actual > predicted ? 1 : -1;
    
    const errorObj = {
      predicted,
      actual,
      error,
      sign,
      magnitude: error / (Math.abs(actual) + 0.001),
      timestamp: Date.now()
    };
    
    this.errors.push(errorObj);
    this.totalError += error;
    
    const signal = this.computeErrorSignal(errorObj);
    this.errorSignals.push(signal);
    
    return {
      error,
      significant: error > 0.1,
      signal,
      correction: this.suggestCorrection(errorObj)
    };
  }

  computeErrorSignal(error) {
    const predictionError = error.magnitude;
    const dopamineSignal = predictionError < 0.05 ? 1 : 
                           predictionError < 0.1 ? 0.5 : 
                           predictionError < 0.2 ? 0 : -0.5;
    
    return {
      pe: predictionError,
      dopamine: dopamineSignal,
      learn: predictionError < 0.15
    };
  }

  suggestCorrection(error) {
    return {
      direction: error.sign > 0 ? 'increase' : 'decrease',
      magnitude: error.error * this.learningRate,
      action: 'update_model'
    };
  }

  updateWeights(errorSignal) {
    const weightChange = errorSignal.dopamine * this.learningRate;
    return {
      updated: true,
      change: weightChange,
      newLearningRate: this.learningRate
    };
  }

  getAverageError() {
    if (this.errors.length === 0) return 0;
    return this.totalError / this.errors.length;
  }

  getErrorTrend() {
    const recent = this.errors.slice(-10);
    if (recent.length < 2) return 'insufficient_data';
    
    const firstHalf = recent.slice(0, 5).reduce((a, b) => a + b.error, 0) / 5;
    const secondHalf = recent.slice(5).reduce((a, b) => a + b.error, 0) / 5;
    
    return secondHalf < firstHalf ? 'improving' : 'degrading';
  }
}

module.exports = PredictionError;
