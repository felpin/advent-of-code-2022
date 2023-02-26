import path from "node:path";

import { readFileLineByLine } from "../utils/read-file";
import { Position } from "./types";
import BestSignalFinder from "./BestSignalFinder";

async function setup() {
  let heightmap: number[][] = [];
  let start: Position | undefined;
  let end: Position | undefined;

  let inputLine = 0;

  await readFileLineByLine(
    path.join(__dirname, "input.txt"),
    (line: string) => {
      let heightmapLine = [];

      for (let i = 0; i < line.length; i++) {
        const character = line.at(i);

        if (character === "S") {
          start = { x: inputLine, y: i };
          heightmapLine.push("a".charCodeAt(0));
        } else if (character === "E") {
          end = { x: inputLine, y: i };
          heightmapLine.push("z".charCodeAt(0));
        } else {
          heightmapLine.push(line.charCodeAt(i));
        }
      }

      heightmap.push(heightmapLine);
      inputLine++;
    }
  );

  if (!start || !end) {
    throw new Error("No start or end to the heightmap");
  }

  return { heightmap, start, end };
}

async function resolvePart1() {
  const { heightmap, start, end } = await setup();

  const bestSignalFinder = new BestSignalFinder(heightmap, start, end);

  console.log("Day 12, Part 01:", bestSignalFinder.getStepsToBestSignal());
}

(async () => {
  await resolvePart1();
})();
