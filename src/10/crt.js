const CPU = require("./cpu");
module.exports = class CRT {
  static width = 40;
  static spriteRadius = 1;

  #screen = [];

  cpu = new CPU(this.handleCpuChangeCycle.bind(this));

  handleCpuChangeCycle(cycle, register) {
    if (cycle % CRT.width === 1) {
      this.#screen.push([]);
    }

    const row = this.#screen[this.#screen.length - 1];

    const isLitPixel =
      register - CRT.spriteRadius <= row.length &&
      register + CRT.spriteRadius >= row.length;

    row.push(isLitPixel ? "#" : ".");
  }

  renderScreen() {
    for (const row of this.#screen) {
      console.log(
        row.reduce((lineToRender, pixel) => `${lineToRender}${pixel}`)
      );
    }
  }
};
