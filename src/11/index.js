const Monkey = require("./monkey");

const ROUND_COUNT = 20;

function resolveTest() {
  const monkeys = [
    new Monkey([79, 98], (item) => item * 19, 23),
    new Monkey([54, 65, 75, 74], (item) => item + 6, 19),
    new Monkey([79, 60, 97], (item) => item * item, 13),
    new Monkey([74], (item) => item + 3, 17),
  ];

  monkeys[0].monkeysToThrow = [monkeys[2], monkeys[3]];
  monkeys[1].monkeysToThrow = [monkeys[2], monkeys[0]];
  monkeys[2].monkeysToThrow = [monkeys[1], monkeys[3]];
  monkeys[3].monkeysToThrow = [monkeys[0], monkeys[1]];

  play(monkeys, "Day 11, Test:");
}

function resolvePart1() {
  const monkeys = [
    new Monkey([97, 81, 57, 57, 91, 61], (item) => item * 7, 11),
    new Monkey([88, 62, 68, 90], (item) => item * 17, 19),
    new Monkey([74, 87], (item) => item + 2, 5),
    new Monkey([53, 81, 60, 87, 90, 99, 75], (item) => item + 1, 2),
    new Monkey([57], (item) => item + 6, 13),
    new Monkey([54, 84, 91, 55, 59, 72, 75, 70], (item) => item * item, 7),
    new Monkey([95, 79, 79, 68, 78], (item) => item + 3, 3),
    new Monkey([61, 97, 67], (item) => item + 4, 17),
  ];

  monkeys[0].monkeysToThrow = [monkeys[5], monkeys[6]];
  monkeys[1].monkeysToThrow = [monkeys[4], monkeys[2]];
  monkeys[2].monkeysToThrow = [monkeys[7], monkeys[4]];
  monkeys[3].monkeysToThrow = [monkeys[2], monkeys[1]];
  monkeys[4].monkeysToThrow = [monkeys[7], monkeys[0]];
  monkeys[5].monkeysToThrow = [monkeys[6], monkeys[3]];
  monkeys[6].monkeysToThrow = [monkeys[1], monkeys[3]];
  monkeys[7].monkeysToThrow = [monkeys[0], monkeys[5]];

  play(monkeys, "Day 11, Part 01:");
}

function play(monkeys, label) {
  for (let i = 0; i < ROUND_COUNT; i++) {
    for (const monkey of monkeys) {
      monkey.takeTurn();
    }
  }

  const inspections = monkeys
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a);

  console.log(label, inspections[0] * inspections[1]);
}

(async () => {
  await resolveTest();
  await resolvePart1();
})();
