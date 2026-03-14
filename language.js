/**
 * Genome Digital - Language Module
 */

class Language {
  process(text) {
    return { tokens: text.split(' '), processed: true };
  }
  generate(response) {
    return { text: response };
  }
}

module.exports = Language;
