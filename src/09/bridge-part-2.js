module.exports = class Bridge {
  #head = [0, 0];
  #tails = Array(9).fill([0, 0]);

  positions = new Set(["0,0"]);

  move(direction) {
    const [x, y] = this.#head;

    if (direction === "U") {
      this.#head = [x, y + 1];
    } else if (direction === "D") {
      this.#head = [x, y - 1];
    } else if (direction === "L") {
      this.#head = [x - 1, y];
    } else if (direction === "R") {
      this.#head = [x + 1, y];
    }

    this.pingTail(0);
  }

  pingTail(index) {
    if (index === this.#tails.length) {
      const tail = this.#tails[this.#tails.length - 1];
      this.positions.add(`${tail[0]},${tail[1]}`);
      return;
    }

    const [hx, hy] = index === 0 ? this.#head : this.#tails[index - 1];
    const [tx, ty] = this.#tails[index];

    const hasToMoveTailOnX = Math.abs(hx - tx) === 2;
    const hasToMoveTailOnY = Math.abs(hy - ty) === 2;

    if (hasToMoveTailOnX && hy === ty) {
      this.#tails[index] = [hx > tx ? tx + 1 : tx - 1, ty];
      this.pingTail(index + 1);
      return;
    }

    if (hx === tx && hasToMoveTailOnY) {
      this.#tails[index] = [tx, hy > ty ? ty + 1 : ty - 1];
      this.pingTail(index + 1);
      return;
    }

    if (hasToMoveTailOnX || hasToMoveTailOnY) {
      this.#tails[index] = [
        hx > tx ? tx + 1 : tx - 1,
        hy > ty ? ty + 1 : ty - 1,
      ];
    }

    this.pingTail(index + 1);
  }
};
