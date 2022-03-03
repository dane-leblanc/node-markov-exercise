const { MarkovMachine } = require("./markov");

describe("markov machine", function () {
  test("make chains", function () {
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm.chains).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [null],
    });
  });

  test("randomWord picks random word from array", function () {
    let arr = ["the", "cat", "in", "hat"];
    expect(arr).toContain(MarkovMachine.randomWord(arr));
    expect(MarkovMachine.randomWord(["hat", "hat", "hat"])).toEqual("hat");
  });

  test("machine returns a string", function () {
    let mm = new MarkovMachine("he went to the place that he went");
    let output = mm.makeText();
    expect(typeof output).toEqual("string");
  });

  test("return ends with last word of input", function () {
    let mm = new MarkovMachine("one two one three four five");
    let output = mm.makeText();
    expect(output.endsWith("five")).toBe(true);
  });
});
