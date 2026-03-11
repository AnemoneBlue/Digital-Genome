/**
 * Genome Digital - Cranial Nerves
 * Brain-body connections - 12 pairs
 * Added: 11 Mar 2026
 */

class CranialNerves {
  constructor() {
    this.nerves = 12;
    this.nerveNames = [
      'olfactory', 'optic', 'oculomotor', 'trochlear',
      'trigeminal', 'abducens', 'facial', 'vestibulocochlear',
      'glossopharyngeal', 'vagus', 'accessory', 'hypoglossal'
    ];
    this.connections = [];
  }

  signal(nerve, signal) {
    const nerveIndex = this.nerveNames.indexOf(nerve);
    const valid = nerveIndex >= 0 && nerveIndex < this.nerves;
    
    const connection = {
      nerve,
      signal,
      transmitted: valid,
      timestamp: Date.now()
    };
    
    if (valid) {
      this.connections.push(connection);
    }
    
    return connection;
  }

  getNerves() {
    return this.nerveNames.map((name, i) => ({ id: i + 1, name }));
  }
}

module.exports = CranialNerves;
