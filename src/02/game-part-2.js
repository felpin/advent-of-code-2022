const shapes = ["Rock", "Paper", "Scissors"];

const shapeValues = { Rock: 1, Paper: 2, Scissors: 3 };
const opponentShapeCypher = { A: "Rock", B: "Paper", C: "Scissors" };

const outcomeScore = { X: 0, Y: 3, Z: 6 };
const outcomeIndexOffset = { X: 2, Y: 0, Z: 1 };

module.exports = class Game {
  score = 0;

  scoreRound(roundResultCode, opponentCode) {
    this.score += outcomeScore[roundResultCode];

    const opponentShape = opponentShapeCypher[opponentCode];
    const opponentShapeIndex = shapeValues[opponentShape] - 1;

    this.score +=
      shapeValues[
        shapes[
          (opponentShapeIndex + outcomeIndexOffset[roundResultCode]) %
            shapes.length
        ]
      ];
  }
};
