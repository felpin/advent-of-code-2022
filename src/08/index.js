const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

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

async function resolvePart1() {
  const treeGrid = [];
  const visibleTreesIndexes = [];

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    treeGrid.push([...line].map((value) => parseInt(value, 10)));
  });

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

(async () => {
  await resolvePart1();
})();
