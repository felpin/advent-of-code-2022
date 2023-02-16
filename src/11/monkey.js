module.exports = class Monkey {
  inspections = 0;
  monkeysToThrow = [];

  constructor(items, operation, division) {
    this.division = division;
    this.items = items;
    this.operation = operation;
  }

  receiveItem(item) {
    this.items.push(item);
  }

  takeTurn() {
    for (const item of this.items) {
      const nextWorryLevel = Math.floor(this.operation(item) / 3);
      this.throwItem(nextWorryLevel);
    }

    this.inspections += this.items.length;
    this.items = [];
  }

  throwItem(item) {
    const monkeyToThrow =
      item % this.division === 0
        ? this.monkeysToThrow[0]
        : this.monkeysToThrow[1];

    monkeyToThrow.receiveItem(item);
  }
};
