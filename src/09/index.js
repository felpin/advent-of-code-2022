const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

const Bridge = require("./bridge");

async function resolvePart1() {
  const bridge = new Bridge();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const [direction, times] = line.split(" ");

    for (let i = 0; i < Number.parseInt(times); i++) {
      bridge.move(direction);
    }
  });

  console.log("Day 09, Part 01:", bridge.positions.size);
}

async function resolvePart2() {
  const bridge = new Bridge(9);

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const [direction, times] = line.split(" ");

    for (let i = 0; i < Number.parseInt(times); i++) {
      bridge.move(direction);
    }
  });

  console.log("Day 09, Part 02:", bridge.positions.size);
}

(async () => {
  await resolvePart1();
  await resolvePart2();
})();
