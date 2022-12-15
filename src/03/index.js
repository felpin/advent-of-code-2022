const path = require("node:path");

const { readFileLineByLine } = require("../utils/read-file");

const rucksack = require("./rucksack");
const badge = require("./badge");

async function resolvePart1() {
  let sum = 0;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    sum += rucksack(line)
  });

  console.log("Day 03, Part 01:", sum);
}

async function resolvePart2() {
  let rucksacks = []
  let sum = 0

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    rucksacks.push(line)

    if (rucksacks.length < 3) {
      return;
    }

    sum += badge(rucksacks)
    rucksacks = []
  });

  console.log("Day 03, Part 02:", sum);
}

(async () => {
  await resolvePart1();
  await resolvePart2();
})();
