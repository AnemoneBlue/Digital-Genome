/**
 * Genome Digital - Navigation Module
 * Spatial awareness and navigation
 * Added: 11 Mar 2026
 */

class NavigationModule {
  constructor() {
    this.mentalMap = new Map();
    this.currentPosition = { x: 0, y: 0, z: 0 };
    this.landmarks = [];
  }

  updatePosition(x, y, z = 0) {
    this.currentPosition = { x, y, z };
    return this.currentPosition;
  }

  addLandmark(name, position, description = '') {
    const landmark = {
      name,
      position,
      description,
      visited: false,
      visits: 0
    };
    this.landmarks.push(landmark);
    return landmark;
  }

  navigateTo(target) {
    const targetLandmark = this.landmarks.find(l => l.name === target);
    if (!targetLandmark) return { error: 'Landmark not found' };
    
    const distance = this.calculateDistance(this.currentPosition, targetLandmark.position);
    
    targetLandmark.visited = true;
    targetLandmark.visits++;
    
    return {
      target: targetLandmark.name,
      distance,
      estimatedTime: distance * 2,
      directions: this.generateDirections(distance)
    };
  }

  calculateDistance(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dz = to.z - from.z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  }

  generateDirections(distance) {
    const directions = ['north', 'south', 'east', 'west', 'up', 'down'];
    return {
      primary: directions[Math.floor(Math.random() * 4)],
      distance,
      steps: Math.floor(distance * 10)
    };
  }

  explore(radius = 10) {
    const nearbyLandmarks = this.landmarks.filter(l => 
      this.calculateDistance(this.currentPosition, l.position) <= radius
    );
    return {
      currentPosition: this.currentPosition,
      radius,
      found: nearbyLandmarks.length,
      landmarks: nearbyLandmarks
    };
  }

  createMentalMap(locations) {
    locations.forEach(loc => {
      this.landmarks.push({
        name: loc.name,
        position: loc.position,
        description: loc.description || '',
        visited: false,
        visits: 0
      });
    });
    return { mapped: locations.length, landmarks: this.landmarks.length };
  }

  getPosition() {
    return this.currentPosition;
  }
}

module.exports = NavigationModule;
