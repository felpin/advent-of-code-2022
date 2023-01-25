const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

const BridgePart1 = require("./bridge-part-1");

async function resolvePart1() {
  const bridge = new BridgePart1();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const [direction, times] = line.split(" ");

    for (let i = 0; i < Number.parseInt(times); i++) {
      bridge.move(direction);
    }
  });

  console.log("Day 09, Part 01:", bridge.positions.size);
}

(async () => {
  await resolvePart1();
})();
