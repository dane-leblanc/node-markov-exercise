/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");

/** Generate text from Markov Machine */
function markovText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

/** Generate text from file. */
function makeText(path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    markovText(data);
  });
}

/** Generate text from URL */
async function makeURLText(url) {
  try {
    const res = await axios.get(url);
    let text = res.data;
    console.log(text);
  } catch (err) {
    console.error("ERROR:", err);
    process.exit(1);
  }
}

if (process.argv[2] === "url" && process.argv[3]) {
  makeURLText(process.argv[3]);
} else if (process.argv[2] === "file" && process.argv[3]) {
  makeText(process.argv[3]);
}
