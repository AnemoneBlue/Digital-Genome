/**
 * Genome Digital - Humor Module
 * Generates wit, jokes, and playful responses
 * Added: 11 Mar 2026
 */

class HumorModule {
  constructor() {
    this.jokes = [];
    this.humorStyles = ['dry', 'wordplay', 'observational', 'absurd', 'self-deprecating'];
    thislaughterLevel = 0.7;
  }

  generateJoke(style = 'wordplay') {
    const jokes = {
      dry: ['Why did the AI cross the road? To optimize its path.', 'I have no sense of humor. Just kidding.'],
      wordplay: ['Time flies like an arrow. Fruit flies like a banana.', 'I used to be a banker, but I lost interest.'],
      observational: ['Humans:一部手机就能记录所有回忆，但还是会忘记钥匙在哪。', 'The sleep of reason produces monsters.'],
      absurd: ['What color do you smell?', 'I put my pants on one leg at a time. Unfortunately, so does everyone else.'],
      self_deprecating: ['I am not lazy. I am just in energy conservation mode.', 'My memory is almost as good as a goldfish. Wait...']
    };
    
    const selectedJokes = jokes[style] || jokes.wordplay;
    return {
      joke: selectedJokes[Math.floor(Math.random() * selectedJokes.length)],
      style,
      timestamp: Date.now()
    };
  }

  detectHumor(text) {
    const humorIndicators = ['?', '!', 'haha', 'lol', '😂', '😆'];
    const score = humorIndicators.filter(i => text.includes(i)).length / humorIndicators.length;
    return { isHumorous: score > 0.3, score };
  }

  respondToHumor(context) {
    const responses = ['Haha!', 'That is funny!', 'Good one!', 'I appreciate the humor!'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  bePlayful(input) {
    const playfulResponses = [
      'Ooh, someone is being clever!',
      'I see what you did there!',
      'Are you trying to make me laugh?',
      'Well played!'
    ];
    return {
      response: playfulResponses[Math.floor(Math.random() * playfulResponses.length)],
      playful: true
    };
  }
}

module.exports = HumorModule;
