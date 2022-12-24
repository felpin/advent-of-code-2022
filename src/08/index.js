const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

function getScenicScore(height, sides) {
  const scores = [];

  for (const side of sides) {
    let visibleTrees = 0;

    for (const tree of side) {
      visibleTrees++;

      if (tree >= height) {
        break;
      }
    }

    scores.push(visibleTrees);
  }

  return scores.reduce((scenicScore, score) => scenicScore * score);
}

function getVisibleTrees(trees) {
  let lastTreeHeight = trees[0];
  let visibleTreesIndexes = [0];

  let index = 1;
  while (index < trees.length && lastTreeHeight < 9) {
    const height = trees[index];

    if (height > lastTreeHeight) {
      lastTreeHeight = height;
      visibleTreesIndexes.push(index);
    }

    index += 1;
  }

  return visibleTreesIndexes;
}

function resolvePart1(treeGrid) {
  const visibleTreesIndexes = [];

  for (let rowIndex = 0; rowIndex < treeGrid.length; rowIndex++) {
    const row = treeGrid[rowIndex];

    getVisibleTrees(row).forEach((index) => {
      visibleTreesIndexes.push(`${rowIndex},${index}`);
    });

    row.reverse();

    getVisibleTrees(row).forEach((index) => {
      visibleTreesIndexes.push(`${rowIndex},${row.length - 1 - index}`);
    });

    row.reverse();
  }

  for (let columnIndex = 0; columnIndex < treeGrid[0].length; columnIndex++) {
    const column = treeGrid.map((row) => row[columnIndex]);

    getVisibleTrees(column).forEach((index) => {
      visibleTreesIndexes.push(`${index},${columnIndex}`);
    });

    column.reverse();

    getVisibleTrees(column).forEach((index) => {
      visibleTreesIndexes.push(`${column.length - 1 - index},${columnIndex}`);
    });
  }

  const set = new Set(visibleTreesIndexes);

  console.log("Day 08, Part 01:", set.size);
}

function resolvePart2(grid) {
  let highestScenicScore = 0;

  for (let rowIndex = 1; rowIndex < grid.length - 1; rowIndex++) {
    const row = grid[rowIndex];

    for (let columnIndex = 1; columnIndex < row.length - 1; columnIndex++) {
      const top = grid
        .slice(0, rowIndex)
        .map((row) => row[columnIndex])
        .reverse();

      const bottom = grid.slice(rowIndex + 1).map((row) => row[columnIndex]);
      const left = row.slice(0, columnIndex).reverse();
      const right = row.slice(columnIndex + 1);

      const score = getScenicScore(grid[rowIndex][columnIndex], [
        top,
        bottom,
        left,
        right,
      ]);

      if (score > highestScenicScore) {
        highestScenicScore = score;
      }
    }
  }

  console.log("Day 08, Part 02:", highestScenicScore);
}

(async () => {
  const treeGrid = [];
  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    treeGrid.push([...line].map((value) => parseInt(value, 10)));
  });

  resolvePart1(treeGrid);
  resolvePart2(treeGrid);
})();
