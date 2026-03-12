/**
 * Genome Digital - Integration Hub Module
 * Integrates all cognitive modules
 * Added: 12 Mar 2026
 */

class IntegrationHub {
  constructor() {
    this.modules = {};
    this.connections = [];
    this.dataFlow = [];
  }

  // Register module
  registerModule(name, module) {
    this.modules[name] = module;
    return { moduleRegistered: name };
  }

  // Connect modules
  connect(fromModule, toModule, type = 'feed_forward') {
    const connection = {
      id: Date.now(),
      from: fromModule,
      to: toModule,
      type,
      active: true
    };

    this.connections.push(connection);
    return { connected: true };
  }

  // Process data through connected modules
  process(data, startModule) {
    this.dataFlow.push({
      input: data,
      startModule,
      timestamp: Date.now()
    });

    let currentData = data;
    const path = [startModule];

    // Find connected modules
    const connected = this.connections
      .filter(c => c.from === startModule && c.active)
      .map(c => c.to);

    for (const moduleName of connected) {
      if (this.modules[moduleName] && this.modules[moduleName].process) {
        currentData = this.modules[moduleName].process(currentData);
        path.push(moduleName);
      }
    }

    return {
      output: currentData,
      path,
      modulesTraversed: path.length
    };
  }

  // Broadcast to all modules
  broadcast(message) {
    const results = {};

    Object.keys(this.modules).forEach(name => {
      if (this.modules[name].receive) {
        results[name] = this.modules[name].receive(message);
      }
    });

    return { broadcast: true, results };
  }

  // Get module by name
  getModule(name) {
    return this.modules[name] || null;
  }

  // Get all modules
  getAllModules() {
    return Object.keys(this.modules);
  }

  // Get connections
  getConnections() {
    return this.connections;
  }

  getStatus() {
    return {
      modulesRegistered: Object.keys(this.modules).length,
      connections: this.connections.length,
      dataFlowEvents: this.dataFlow.length
    };
  }
}

module.exports = IntegrationHub;
