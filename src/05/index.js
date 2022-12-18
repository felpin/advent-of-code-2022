const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

async function resolvePart1(stacks) {
  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const order = line.split(" ");
    const cratesToMove = parseInt(order[1]);

    const stackToMoveFrom = parseInt(order[3]) - 1;
    const stackToMoveTo = parseInt(order[5]) - 1;

    for (let i = 0; i < cratesToMove; i++) {
      stacks[stackToMoveTo].push(stacks[stackToMoveFrom].pop());
    }
  });

  const topCrates = stacks.map((stack) => stack[stack.length - 1]).join("");

  console.log("Day 05, Part 01:", topCrates);
}

async function resolvePart2(stacks) {
  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const order = line.split(" ");
    const cratesToMove = parseInt(order[1]);

    const stackToMoveFrom = parseInt(order[3]) - 1;
    const stackToMoveTo = parseInt(order[5]) - 1;

    stacks[stackToMoveTo].push(
      ...stacks[stackToMoveFrom].splice(-cratesToMove, cratesToMove)
    );
  });

  const topCrates = stacks.map((stack) => stack[stack.length - 1]).join("");

  console.log("Day 05, Part 02:", topCrates);
}

(async () => {
  const stacks = [
    ["Z", "T", "F", "R", "W", "J", "G"],
    ["G", "W", "M"],
    ["J", "N", "H", "G"],
    ["J", "R", "C", "N", "W"],
    ["W", "F", "S", "B", "G", "Q", "V", "M"],
    ["S", "R", "T", "D", "V", "W", "C"],
    ["H", "B", "N", "C", "D", "Z", "G", "V"],
    ["S", "J", "N", "M", "G", "C"],
    ["G", "P", "N", "W", "C", "J", "D", "L"],
  ];

  const createStacksCopy = () => stacks.map((stack) => [...stack]);

  await resolvePart1(createStacksCopy());
  await resolvePart2(createStacksCopy());
})();
