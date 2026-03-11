/**
 * 📚 Learning System
 * Machine learning and adaptation
 */

class LearningSystem {
  constructor() {
    this.learningRate = 0.01;
    this.models = new Map();
    this.weights = new Map();
    this.biases = new Map();
    this.gradientHistory = [];
  }

  // Hebbian learning - "neurons that fire together wire together"
  hebbianLearn(preSynaptic, postSynaptic, strength = 0.1) {
    const key = `${preSynaptic}-${postSynaptic}`;
    const currentWeight = this.weights.get(key) || 0;

    // Hebb's rule: Δw = η * pre * post
    const delta = this.learningRate * preSynaptic * postSynaptic;
    const newWeight = currentWeight + delta;

    this.weights.set(key, newWeight);
    return { delta, newWeight };
  }

  // Backpropagation learning
  backpropagate(input, expectedOutput) {
    const output = this.forwardPass(input);
    const error = expectedOutput - output;

    // Calculate gradients
    const gradients = this.calculateGradients(input, error);

    // Update weights
    this.updateWeights(gradients);

    return { output, error, gradients };
  }

  forwardPass(input) {
    let sum = 0;
    for (const [key, weight] of this.weights) {
      const inputKey = key.split('-')[0];
      if (input[inputKey]) {
        sum += input[inputKey] * weight;
      }
    }
    return this.activation(sum + (this.biases.get('output') || 0));
  }

  calculateGradients(input, error) {
    const gradients = {};
    
    for (const [key, weight] of this.weights) {
      const inputKey = key.split('-')[0];
      gradients[key] = error * this.activationDerivative(input[inputKey]) * input[inputKey];
    }

    return gradients;
  }

  updateWeights(gradients) {
    for (const [key, gradient] of Object.entries(gradients)) {
      const currentWeight = this.weights.get(key) || 0;
      this.weights.set(key, currentWeight - this.learningRate * gradient);
    }
  }

  // Reinforcement learning
  reinforce(action, reward, state) {
    const qValue = this.getQValue(state, action);
    const newQValue = qValue + this.learningRate * (reward - qValue);
    
    this.weights.set(`${state}-${action}`, newQValue);
    return { qValue: newQValue, improved: newQValue > qValue };
  }

  getQValue(state, action) {
    return this.weights.get(`${state}-${action}`) || 0;
  }

  // Exploration vs Exploitation (ε-greedy)
  chooseAction(state, epsilon = 0.1) {
    if (Math.random() < epsilon) {
      return { action: 'explore', value: Math.random() };
    }
    
    // Exploit - choose best action
    let bestAction = null;
    let bestValue = -Infinity;
    
    for (let i = 0; i < 5; i++) {
      const value = this.getQValue(state, i);
      if (value > bestValue) {
        bestValue = value;
        bestAction = i;
      }
    }
    
    return { action: bestAction, value: bestValue };
  }

  // Unsupervised learning (clustering)
  cluster(data, k = 3) {
    const centroids = this.initializeCentroids(data, k);
    let changed = true;
    let iterations = 0;

    while (changed && iterations < 100) {
      const assignments = this.assignToClusters(data, centroids);
      const newCentroids = this.updateCentroids(data, assignments, k);
      
      changed = JSON.stringify(centroids) !== JSON.stringify(newCentroids);
      centroids = newCentroids;
      iterations++;
    }

    return { centroids, iterations };
  }

  initializeCentroids(data, k) {
    const centroids = [];
    for (let i = 0; i < k; i++) {
      centroids.push(data[Math.floor(Math.random() * data.length)]);
    }
    return centroids;
  }

  assignToClusters(data, centroids) {
    return data.map(point => {
      let minDist = Infinity;
      let cluster = 0;
      
      centroids.forEach((centroid, i) => {
        const dist = this.euclideanDistance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          cluster = i;
        }
      });
      
      return cluster;
    });
  }

  updateCentroids(data, assignments, k) {
    const newCentroids = Array(k).fill(0).map(() => ({ x: 0, y: 0, count: 0 }));
    
    data.forEach((point, i) => {
      const cluster = assignments[i];
      newCentroids[cluster].x += point.x;
      newCentroids[cluster].y += point.y;
      newCentroids[cluster].count++;
    });

    return newCentroids.map(c => ({
      x: c.count > 0 ? c.x / c.count : 0,
      y: c.count > 0 ? c.y / c.count : 0
    }));
  }

  euclideanDistance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  activation(x) {
    return 1 / (1 + Math.exp(-x)); // Sigmoid
  }

  activationDerivative(x) {
    return x * (1 - x); // Derivative of sigmoid
  }

  getLearningStats() {
    return {
      totalWeights: this.weights.size,
      learningRate: this.learningRate,
      gradientHistory: this.gradientHistory.slice(-10)
    };
  }
}

module.exports = new LearningSystem();
