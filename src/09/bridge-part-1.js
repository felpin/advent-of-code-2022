module.exports = class Bridge {
  #head = [0, 0];
  #tail = [0, 0];

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

    this.pingTail();
  }

  pingTail() {
    const [hx, hy] = this.#head;
    const [tx, ty] = this.#tail;

    const hasToMoveTailOnX = Math.abs(hx - tx) === 2;
    const hasToMoveTailOnY = Math.abs(hy - ty) === 2;

    if (hasToMoveTailOnX && hy === ty) {
      this.#tail = [hx > tx ? tx + 1 : tx - 1, ty];
      this.positions.add(`${this.#tail[0]},${ty}`);
      return;
    }

    if (hx === tx && hasToMoveTailOnY) {
      this.#tail = [tx, hy > ty ? ty + 1 : ty - 1];
      this.positions.add(`${tx},${this.#tail[1]}`);
      return;
    }

    if (hasToMoveTailOnX || hasToMoveTailOnY) {
      this.#tail = [hx > tx ? tx + 1 : tx - 1, hy > ty ? ty + 1 : ty - 1];
      this.positions.add(`${this.#tail[0]},${this.#tail[1]}`);
    }
  }
};
