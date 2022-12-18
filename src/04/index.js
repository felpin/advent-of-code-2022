const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

function isFullyOverlapping(sections) {
  const pair1 = [sections[0], sections[1]];
  const pair2 = [sections[2], sections[3]];

  return (
    (pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) ||
    (pair2[0] <= pair1[0] && pair2[1] >= pair1[1])
  );
}

function isPartlyOverlapping(sections) {
  const pair1 = [sections[0], sections[1]];
  const pair2 = [sections[2], sections[3]];

  return (
    (pair1[1] >= pair2[0] && pair1[0] <= pair2[1]) ||
    (pair2[1] >= pair1[0] && pair2[0] <= pair1[1])
  );
}

async function resolvePart1() {
  let overlappedPairs = 0;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const pairs = line.split(",");
    const sections = pairs.flatMap((pair) =>
      pair.split("-").map((section) => parseInt(section))
    );

    if (isFullyOverlapping(sections)) {
      overlappedPairs += 1;
    }
  });

  console.log("Day 04, Part 01:", overlappedPairs);
}

async function resolvePart2() {
  let overlappedPairs = 0;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const pairs = line.split(",");
    const sections = pairs.flatMap((pair) =>
      pair.split("-").map((section) => parseInt(section))
    );

    if (isPartlyOverlapping(sections)) {
      overlappedPairs += 1;
    }
  });

  console.log("Day 04, Part 02:", overlappedPairs);
}

(async () => {
  await resolvePart1();
  await resolvePart2();
})();
