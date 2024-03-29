module.exports = class CPU {
  #cycle = 0;
  #pipeline = [];
  #registerX = 1;

  #handleChangeCycle = undefined;

  signalStrengthSum = 0;

  constructor(onChangeCycle) {
    this.#handleChangeCycle = onChangeCycle;
  }

  run(command) {
    const [program, ...args] = command.split(" ");

    if (program === "noop") {
      this.runNoop();
    } else if (program === "addx") {
      this.runAddX(Number.parseInt(args[0], 10));
    }

    this.executePipeline();
  }

  runAddX(value) {
    this.#pipeline.push(undefined, () => (this.#registerX += value));
  }

  runNoop() {
    this.#pipeline.push(undefined);
  }

  executePipeline() {
    if (this.#pipeline.length === 0) {
      return;
    }

    this.#cycle++;
    this.#handleChangeCycle?.(this.#cycle, this.#registerX);

    if (this.#cycle % 40 === 20) {
      this.signalStrengthSum += this.#cycle * this.#registerX;
    }

    this.#pipeline.shift()?.();

    this.executePipeline();
  }
};
