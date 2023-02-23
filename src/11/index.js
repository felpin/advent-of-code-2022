const Monkey = require("./monkey");

const ROUND_COUNT_PART_1 = 20;
const ROUND_COUNT_PART_2 = 10000;

const RELIEF_PART_1 = (item) => Math.floor(item / 3);

function setup(relief) {
  const monkeys = [
    new Monkey([97, 81, 57, 57, 91, 61], (item) => item * 7, 11, relief),
    new Monkey([88, 62, 68, 90], (item) => item * 17, 19, relief),
    new Monkey([74, 87], (item) => item + 2, 5, relief),
    new Monkey([53, 81, 60, 87, 90, 99, 75], (item) => item + 1, 2, relief),
    new Monkey([57], (item) => item + 6, 13, relief),
    new Monkey(
      [54, 84, 91, 55, 59, 72, 75, 70],
      (item) => item * item,
      7,
      relief
    ),
    new Monkey([95, 79, 79, 68, 78], (item) => item + 3, 3, relief),
    new Monkey([61, 97, 67], (item) => item + 4, 17, relief),
  ];

  monkeys[0].monkeysToThrow = [monkeys[5], monkeys[6]];
  monkeys[1].monkeysToThrow = [monkeys[4], monkeys[2]];
  monkeys[2].monkeysToThrow = [monkeys[7], monkeys[4]];
  monkeys[3].monkeysToThrow = [monkeys[2], monkeys[1]];
  monkeys[4].monkeysToThrow = [monkeys[7], monkeys[0]];
  monkeys[5].monkeysToThrow = [monkeys[6], monkeys[3]];
  monkeys[6].monkeysToThrow = [monkeys[1], monkeys[3]];
  monkeys[7].monkeysToThrow = [monkeys[0], monkeys[5]];

  return monkeys;
}

function setupTest(relief) {
  const monkeys = [
    new Monkey([79, 98], (item) => item * 19, 23, relief),
    new Monkey([54, 65, 75, 74], (item) => item + 6, 19, relief),
    new Monkey([79, 60, 97], (item) => item * item, 13, relief),
    new Monkey([74], (item) => item + 3, 17, relief),
  ];

  monkeys[0].monkeysToThrow = [monkeys[2], monkeys[3]];
  monkeys[1].monkeysToThrow = [monkeys[2], monkeys[0]];
  monkeys[2].monkeysToThrow = [monkeys[1], monkeys[3]];
  monkeys[3].monkeysToThrow = [monkeys[0], monkeys[1]];

  return monkeys;
}

function setupReliefPart2(monkeys) {
  const product = monkeys.reduce(
    (product, monkey) => product * monkey.division,
    1
  );

  monkeys.forEach((monkey) => {
    monkey.relief = (item) => item % product;
  });
}

function play(monkeys, roundCount, label) {
  for (let i = 0; i < roundCount; i++) {
    for (const monkey of monkeys) {
      monkey.takeTurn();
    }
  }

  const inspections = monkeys
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a);

  console.log(label, inspections[0] * inspections[1]);
}

function resolvePart1() {
  const monkeys = setup(RELIEF_PART_1);
  play(monkeys, ROUND_COUNT_PART_1, "Day 11, Part 01:");
}

function resolvePart2() {
  const monkeys = setup((item) => item);
  setupReliefPart2(monkeys);

  play(monkeys, ROUND_COUNT_PART_2, "Day 11, Part 02:");
}

function resolveTest1() {
  const monkeys = setupTest(RELIEF_PART_1);
  play(monkeys, ROUND_COUNT_PART_1, "Day 11, Test 01:");
}

function resolveTest2() {
  const monkeys = setupTest();
  setupReliefPart2(monkeys);

  play(monkeys, ROUND_COUNT_PART_2, "Day 11, Test 02:");
}

(async () => {
  await resolveTest1();
  await resolvePart1();
  await resolveTest2();
  await resolvePart2();
})();
