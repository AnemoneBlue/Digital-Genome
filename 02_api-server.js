/**
 * Genome Digital - REST API Server
 * Exposes the brain as a web service
 * Added: 6 Mar 2026
 */

const http = require('http');
const Brain = require('./brain');

class GenomeAPIServer {
  constructor(port = 3000) {
    this.port = port;
    this.brain = new Brain({ name: 'Genome-API' });
    this.server = null;
  }

  async start() {
    await this.brain.initialize(500);
    
    this.server = http.createServer(async (req, res) => {
      // CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      // Parse URL
      const url = new URL(req.url, `http://localhost:${this.port}`);
      const path = url.pathname;
      const method = req.method;

      try {
        // Routes
        if (path === '/health' && method === 'GET') {
          this.sendJSON(res, { status: 'ok', brain: this.brain.getStatus().name });
        }
        else if (path === '/status' && method === 'GET') {
          this.sendJSON(res, this.brain.getStatus());
        }
        else if (path === '/think' && method === 'POST') {
          const body = await this.readBody(req);
          const result = await this.brain.think(body.input || null);
          this.sendJSON(res, result);
        }
        else if (path === '/speak' && method === 'POST') {
          const body = await this.readBody(req);
          const response = await this.brain.speak(body.text || 'Hello');
          this.sendJSON(res, { response });
        }
        else if (path === '/dream' && method === 'POST') {
          const dream = await this.brain.dream();
          this.sendJSON(res, { dream });
        }
        else if (path === '/sleep' && method === 'POST') {
          this.brain.sleep();
          this.sendJSON(res, { status: 'sleeping' });
        }
        else if (path === '/wake' && method === 'POST') {
          this.brain.wake();
          this.sendJSON(res, { status: 'awake' });
        }
        else if (path === '/explore' && method === 'POST') {
          const body = await this.readBody(req);
          const ideas = await this.brain.explore(body.topic || 'unknown');
          this.sendJSON(res, { ideas });
        }
        else if (path === '/memory' && method === 'GET') {
          const memories = this.brain.memory.retrieveRecent(10);
          this.sendJSON(res, { memories });
        }
        else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Not found' }));
        }
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
      }
    });

    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log(`🌐 Genome Digital API running on http://localhost:${this.port}`);
        console.log('Endpoints:');
        console.log('  GET  /health     - Health check');
        console.log('  GET  /status     - Brain status');
        console.log('  POST /think     - Think about something');
        console.log('  POST /speak     - Natural language');
        console.log('  POST /dream     - Enter dream state');
        console.log('  POST /sleep     - Go to sleep');
        console.log('  POST /wake      - Wake up');
        console.log('  POST /explore   - Explore a topic');
        console.log('  GET  /memory    - Recent memories');
        resolve();
      });
    });
  }

  readBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (e) {
          resolve({});
        }
      });
      req.on('error', reject);
    });
  }

  sendJSON(res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(data, null, 2));
  }

  stop() {
    if (this.server) {
      this.server.close();
      console.log('🛑 Genome API stopped');
    }
  }
}

// Start server if run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const server = new GenomeAPIServer(port);
  
  server.start().catch(console.error);
  
  process.on('SIGINT', () => {
    server.stop();
    process.exit();
  });
}

module.exports = GenomeAPIServer;
