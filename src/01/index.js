const path = require("node:path");

const { readFileLineByLine } = require("../utils/read-file");

const Calories = require("./calories");

async function readElvesCalories(calories) {
  let currentCalories = 0;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    if (line === "") {
      calories.countElfCalories(currentCalories);
      currentCalories = 0;
      return;
    }

    currentCalories += globalThis.parseInt(line);
  });
}

async function resolvePart1() {
  const calories = new Calories(1);
  await readElvesCalories(calories);

  console.log("Day 01, Part 01:", calories.total);
}

async function resolvePart2() {
  const calories = new Calories(3);
  await readElvesCalories(calories);

  console.log("Day 01, Part 02:", calories.total);
}

(async () => {
  await resolvePart1();
  await resolvePart2();
})();
