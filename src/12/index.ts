import path from "node:path";

import { readFileLineByLine } from "../utils/read-file";
import { Position } from "./types";
import BestSignalFinderPart01 from "./BestSignalFinderPart01";
import BestSignalFinderPart02 from "./BestSignalFinderPart02";

type SetupOutput = Awaited<ReturnType<typeof setup>>;

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

async function resolvePart1(setupOutput: SetupOutput) {
  const { heightmap, start, end } = setupOutput;

  const bestSignalFinder = new BestSignalFinderPart01(heightmap, start, end);

  console.log("Day 12, Part 01:", bestSignalFinder.getStepsToBestSignal());
}

async function resolvePart2(setupOutput: SetupOutput) {
  const { heightmap, start, end } = setupOutput;

  const bestSignalFinder = new BestSignalFinderPart02(
    heightmap,
    end,
    heightmap[start.x][start.y]
  );

  console.log("Day 12, Part 02:", bestSignalFinder.getStepsToBestSignal());
}

(async () => {
  const setupOutput = await setup();

  await resolvePart1(setupOutput);
  await resolvePart2(setupOutput);
})();
