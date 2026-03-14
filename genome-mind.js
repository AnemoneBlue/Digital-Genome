/**
 * Genome Digital - Main Mind Class
 */

class GenomeMind {
  constructor(name = 'Genesis') {
    this.name = name;
    this.version = '1.0.0';
    this.memories = [];
    this.conversations = [];
    this.personality = 'helpful';
    this.created = Date.now();
  }

  learn(info) {
    this.memories.push({ content: info, time: Date.now() });
    return { learned: info };
  }

  think(prompt) {
    return { thinking: true, prompt };
  }

  chat(message) {
    this.conversations.push({ user: message, time: Date.now() });
    return { response: `I understand: ${message}` };
  }

  getStatus() {
    return {
      name: this.name,
      memories: this.memories.length,
      conversations: this.conversations.length,
      personality: this.personality
    };
  }
}

module.exports = GenomeMind;
