const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

const CPU = require("./cpu");

async function resolvePart1() {
  const cpu = new CPU();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (command) => {
    cpu.run(command);
  });

  console.log("Day 10, Part 01:", cpu.signalStrengthSum);
}

(async () => {
  await resolvePart1();
})();
