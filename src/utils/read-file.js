const fs = require("node:fs");
const readline = require("node:readline");

exports.readFileLineByLine = async (path, callback) => {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    callback(line);
  }
};
