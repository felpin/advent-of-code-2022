module.exports = class Monkey {
  inspections = 0;
  monkeysToThrow = [];

  constructor(items, operation, division, relief) {
    this.division = division;
    this.items = items;
    this.operation = operation;
    this.relief = relief;
  }

  receiveItem(item) {
    this.items.push(item);
  }

  takeTurn() {
    for (const item of this.items) {
      const nextWorryLevel = this.relief(this.operation(item));
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
