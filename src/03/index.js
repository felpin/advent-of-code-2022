const path = require("node:path");

const { readFileLineByLine } = require("../utils/read-file");

const rucksack = require("./rucksack");

async function resolvePart1() {
  let sum = 0;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    sum += rucksack(line)
  });

  console.log("Day 03, Part 01:", sum);
}

(async () => {
  await resolvePart1();
})();
