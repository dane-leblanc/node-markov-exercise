/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let next = this.words[i + 1] ? this.words[i + 1] : null;
      if (!chains[word]) {
        chains[word] = Array(next);
      } else {
        chains[word].push(next);
      }
    }
    this.chains = chains;
  }

  /** pick random word from an array of words */
  static randomWord(arr) {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    // TODO
    let keys = Object.keys(this.chains);
    let nextWord = MarkovMachine.randomWord(keys);
    let output = Array(nextWord);
    while (output.length < numWords && nextWord != null) {
      let chain = this.chains[nextWord];
      nextWord = MarkovMachine.randomWord(chain);
      if (nextWord != null) {
        output.push(nextWord);
      }
    }
    return output.join(" ");
  }
}

let mm = new MarkovMachine(
  "the time before the last time was the best time really"
);

mm.makeText();

module.exports = {
  MarkovMachine,
};
