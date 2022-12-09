const path = require("node:path");

const { readFileLineByLine } = require("../utils/read-file");

const GamePart1 = require("./game-part-1");
const GamePart2 = require("./game-part-2");

async function resolvePart1() {
  const game = new GamePart1();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const [opponentCode, code] = line.split(" ");
    game.scoreRound(code, opponentCode);
  });

  console.log("Day 02, Part 01:", game.score);
}

async function resolvePart2() {
  const game = new GamePart2();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const [opponentCode, roundResultCode] = line.split(" ");
    game.scoreRound(roundResultCode, opponentCode);
  });

  console.log("Day 02, Part 02:", game.score);
}

(async () => {
  await resolvePart1();
  await resolvePart2();
})();
