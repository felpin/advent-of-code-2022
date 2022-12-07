const fs = require("node:fs");
const readline = require("node:readline");

(async () => {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let maxCalories = 0;
  let currentCalories = 0;

  for await (const line of rl) {
    if (line === "") {
      maxCalories = Math.max(maxCalories, currentCalories);
      currentCalories = 0;

      continue;
    }

    currentCalories += globalThis.parseInt(line);
  }

  console.log(maxCalories);
})();
