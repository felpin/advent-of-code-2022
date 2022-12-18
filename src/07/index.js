const { readFileLineByLine } = require("../utils/read-file");
const path = require("node:path");

const DirectoryTreeNode = require("./directory-tree-node");

const directoryTreeRoot = new DirectoryTreeNode("/", null);

function changeDirectory(command, directory) {
  const tokens = command.split(" ");
  const target = tokens[2];

  if (target === "/") {
    return directoryTreeRoot;
  }

  if (target === "..") {
    return directory.parent;
  }

  if (directory.children[target]) {
    return directory.children[target];
  }

  return directory.createChildDirectory("target");
}

function getDeletableDirectoriesSize(directory) {
  const initialSize = directory.size <= 100000 ? directory.size : 0;

  return Object.values(directory.children).reduce(
    (size, child) => size + getDeletableDirectoriesSize(child),
    initialSize
  );
}

function getDirectoriesSize(directory) {
  const sizes = [directory.size];

  for (const child of Object.values(directory.children)) {
    sizes.push(...getDirectoriesSize(child));
  }

  return sizes;
}

async function resolvePart1() {
  let directory = directoryTreeRoot;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    const commandTokens = line.split(" ");

    if (commandTokens[0] === "$" && commandTokens[1] === "cd") {
      directory = changeDirectory(line, directory);
      return;
    }

    if (commandTokens[0] === "$" && commandTokens[1] === "ls") {
      return;
    }

    if (commandTokens[0] === "dir") {
      directory.createChildDirectory(commandTokens[1]);
      return;
    }

    directory.createChildFile(parseInt(commandTokens[0]));
  });

  console.log(
    "Day 07, Part 01:",
    getDeletableDirectoriesSize(directoryTreeRoot)
  );
}

function resolvePart2() {
  const sizes = getDirectoriesSize(directoryTreeRoot);

  const freeSpace = 70000000 - directoryTreeRoot.size;
  const minSizeToDelete = 30000000 - freeSpace;
  const deletableDirectories = sizes.filter((size) => size >= minSizeToDelete);

  deletableDirectories.sort((a, b) => a - b);

  console.log("Day 07, Part 02:", deletableDirectories[0]);
}

(async () => {
  await resolvePart1();
  await resolvePart2();
})();
