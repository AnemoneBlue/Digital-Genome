/**
 * Genome Digital - Predictive Processing
 * Hierarchical prediction - the cortical algorithm
 * Added: 11 Mar 2026
 */

class PredictiveProcessing {
  constructor() {
    this.layers = 5;
    this.layerActivations = [];
    this.predictions = [];
    this.errors = [];
  }

  processBottomUp(data) {
    let currentData = data;
    const activations = [];
    
    for (let level = 0; level < this.layers; level++) {
      const prediction = this.getTopDownPrediction(level);
      const error = currentData - prediction;
      
      const activation = {
        level,
        data: currentData,
        prediction,
        error: Math.abs(error),
        timestamp: Date.now()
      };
      
      activations.push(activation);
      this.layerActivations.push(activation);
      this.predictions.push({ level, prediction });
      this.errors.push({ level, error });
      
      currentData = this.processLevel(level, error);
    }
    
    return {
      data,
      processed: true,
      layers: this.layers,
      activations,
      finalOutput: currentData
    };
  }

  processLevel(level, error) {
    const gain = 1 + level * 0.1;
    return error * gain;
  }

  getTopDownPrediction(level) {
    const higherLevel = Math.min(level + 1, this.layers - 1);
    const recentPredictions = this.predictions.filter(p => p.level === higherLevel);
    
    if (recentPredictions.length > 0) {
      return recentPredictions[recentPredictions.length - 1].prediction;
    }
    return Math.random();
  }

  processTopDown(prediction) {
    let currentPrediction = prediction;
    const propagations = [];
    
    for (let level = this.layers - 1; level >= 0; level--) {
      const propagated = {
        level,
        prediction: currentPrediction,
        timestamp: Date.now()
      };
      
      propagations.push(propagated);
      currentPrediction = this.enhancePrediction(currentPrediction, level);
    }
    
    return {
      prediction,
      propagated: propagations,
      finalPrediction: currentPrediction
    };
  }

  enhancePrediction(prediction, level) {
    const precision = 1 - (level * 0.1);
    return prediction * precision;
  }

  getLayerError(level) {
    return this.errors.filter(e => e.level === level).slice(-10);
  }
}

module.exports = PredictiveProcessing;
