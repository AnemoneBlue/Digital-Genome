/**
 * Genome Digital - Navigation Module
 * Spatial navigation and wayfinding
 * Added: 12 Mar 2026
 */

class NavigationModule {
  constructor() {
    this.position = { x: 0, y: 0, z: 0 };
    this.orientation = { pitch: 0, yaw: 0, roll: 0 };
    this.waypoints = [];
    this.landmarks = [];
    this.pathHistory = [];
    this.currentWaypoint = null;
  }

  // Set current position
  setPosition(x, y, z) {
    this.position = { x, y, z };
    return { position: this.position };
  }

  // Set orientation
  setOrientation(pitch, yaw, roll) {
    this.orientation = { pitch, yaw, roll };
    return { orientation: this.orientation };
  }

  // Add a landmark
  addLandmark(name, x, y, z) {
    this.landmarks.push({
      id: Date.now(),
      name,
      position: { x, y, z },
      visited: false,
      importance: 0.5
    });

    return { landmarkAdded: true, total: this.landmarks.length };
  }

  // Navigate to target
  navigateTo(target) {
    let destination;

    if (typeof target === 'string') {
      // Find landmark
      const landmark = this.landmarks.find(l => l.name === target);
      if (!landmark) {
        return { error: 'Landmark not found' };
      }
      destination = landmark.position;
    } else {
      destination = target;
    }

    // Calculate path
    const path = this.calculatePath(this.position, destination);
    
    this.currentWaypoint = {
      destination,
      path,
      currentIndex: 0,
      startedAt: Date.now()
    };

    return {
      navigating: true,
      destination,
      pathLength: path.length,
      estimatedSteps: path.length
    };
  }

  // Calculate path (A* simplified)
  calculatePath(start, end) {
    const path = [];
    let current = { ...start };
    
    const steps = Math.max(
      Math.abs(end.x - start.x),
      Math.abs(end.y - start.y),
      Math.abs(end.z - start.z)
    );

    for (let i = 0; i < steps; i++) {
      const dx = end.x - current.x;
      const dy = end.y - current.y;
      const dz = end.z - current.z;

      const nextStep = {
        x: current.x + Math.sign(dx),
        y: current.y + Math.sign(dy),
        z: current.z + Math.sign(dz)
      };

      path.push(nextStep);
      current = nextStep;
    }

    this.pathHistory.push({
      start: { ...start },
      end: { ...end },
      path,
      timestamp: Date.now()
    });

    return path;
  }

  // Move one step along current path
  moveStep() {
    if (!this.currentWaypoint) {
      return { error: 'No active navigation' };
    }

    const path = this.currentWaypoint.path;
    const index = this.currentWaypoint.currentIndex;

    if (index >= path.length) {
      this.currentWaypoint = null;
      return { arrived: true };
    }

    this.position = path[index];
    this.currentWaypoint.currentIndex++;

    return {
      moved: true,
      newPosition: this.position,
      stepsRemaining: path.length - index - 1
    };
  }

  // Get distance to target
  distanceTo(target) {
    const dx = target.x - this.position.x;
    const dy = target.y - this.position.y;
    const dz = target.z - this.position.z;
    
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  // Get current status
  getStatus() {
    return {
      position: this.position,
      orientation: this.orientation,
      landmarks: this.landmarks.length,
      waypoints: this.waypoints.length,
      navigating: this.currentWaypoint !== null,
      distanceTraveled: this.pathHistory.length
    };
  }

  // Get all landmarks
  getLandmarks() {
    return this.landmarks;
  }

  // Get path history
  getHistory() {
    return this.pathHistory;
  }
}

module.exports = NavigationModule;
