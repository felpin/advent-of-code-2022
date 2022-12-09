const OUTCOME_LOSE = 0;
const OUTCOME_DRAW = 3;
const OUTCOME_WIN = 6;

const shapeValues = { Rock: 1, Paper: 2, Scissors: 3 };
const shapeCypher = { X: "Rock", Y: "Paper", Z: "Scissors" };
const opponentShapeCypher = { A: "Rock", B: "Paper", C: "Scissors" };

module.exports = class Game {
  score = 0;

  scoreRound(code, opponentCode) {
    const shape = shapeCypher[code];
    const opponentShape = opponentShapeCypher[opponentCode];

    const shapeValue = shapeValues[shape];
    const opponentShapeValue = shapeValues[opponentShape];

    this.score += shapeValue;

    if (shape === opponentShape) {
      this.score += OUTCOME_DRAW;
    } else if ((shapeValue + 1) % 3 === opponentShapeValue % 3) {
      this.score += OUTCOME_LOSE;
    } else {
      this.score += OUTCOME_WIN;
    }
  }
};
