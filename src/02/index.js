const path = require("node:path");

const { readFileLineByLine } = require("../utils/read-file");

const Game = require("./game");

(async () => {
  const game = new Game();

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const [opponentCode, code] = line.split(" ");
    game.scoreRound(code, opponentCode);
  });

  console.log(game.score);
})();
