const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

const CPU = require("./cpu");
const CRT = require("./crt");

async function resolvePart1() {
  const cpu = new CPU();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (command) => {
    cpu.run(command);
  });

  console.log("Day 10, Part 01:", cpu.signalStrengthSum);
}

async function resolvePart2() {
  const crt = new CRT();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (command) => {
    crt.cpu.run(command);
  });

  console.log("Day 10, Part 02:");
  crt.renderScreen();
}

(async () => {
  await resolvePart1();
  await resolvePart2();
})();
