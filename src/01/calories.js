module.exports = class Calories {
  #elves = [];
  #size = 0;

  constructor(size = 1) {
    this.#size = size;
  }

  get total() {
    return this.#elves.reduce((total, calories) => total + calories, 0);
  }

  countElfCalories(calories) {
    this.#elves.push(calories);

    if (this.#elves.length > this.#size) {
      this.#elves.sort((a, b) => b - a);
      this.#elves.splice(this.#size, 1);
    }
  }
};
