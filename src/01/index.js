const fs = require("node:fs");
const readline = require("node:readline");

const Calories = require("./calories");

async function readElvesCalories(calories) {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let currentCalories = 0;

  for await (const line of rl) {
    if (line === "") {
      calories.countElfCalories(currentCalories);
      currentCalories = 0;
      continue;
    }

    currentCalories += globalThis.parseInt(line);
  }
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
