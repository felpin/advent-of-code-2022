import { Position } from "./types";
import Queue from "./Queue";

interface PositionVisited extends Position {
  steps: number;
  from?: number;
}

export default class BestSignalFinderPart02 {
  readonly heightmap: number[][];
  readonly start: Position;
  readonly destination: number;

  private steps: number | undefined;

  private readonly pointsToVisit: Queue<PositionVisited>;
  private readonly pointsVisited: Set<string> = new Set<string>();

  constructor(heightmap: number[][], start: Position, destination: number) {
    this.heightmap = heightmap;
    this.start = start;
    this.destination = destination;

    this.pointsToVisit = new Queue<PositionVisited>();
    this.pointsToVisit.enqueue({ ...start, steps: 0 });
  }

  private visitNextPoint() {
    const point = this.pointsToVisit.dequeue();
    if (!point) return;

    const isOutOfBounds =
      point.x < 0 ||
      point.x >= this.heightmap.length ||
      point.y < 0 ||
      point.y >= this.heightmap[0].length;
    if (isOutOfBounds) return;

    const height = this.heightmap[point.x][point.y];
    if (point.from !== undefined && height < point.from - 1) return;

    const pointString = `${point.x}_${point.y}`;
    if (this.pointsVisited.has(pointString)) return;

    if (height === this.destination) {
      this.steps = point.steps;
      return;
    }

    this.pointsVisited.add(pointString);

    const nextPositionToVisit: PositionVisited = {
      ...point,
      from: height,
      steps: point.steps + 1,
    };

    this.pointsToVisit.enqueue({
      ...nextPositionToVisit,
      x: nextPositionToVisit.x + 1,
    });

    this.pointsToVisit.enqueue({
      ...nextPositionToVisit,
      x: nextPositionToVisit.x - 1,
    });

    this.pointsToVisit.enqueue({
      ...nextPositionToVisit,
      y: nextPositionToVisit.y + 1,
    });

    this.pointsToVisit.enqueue({
      ...nextPositionToVisit,
      y: nextPositionToVisit.y - 1,
    });
  }

  getStepsToBestSignal(): number {
    while (this.steps === undefined && this.pointsToVisit.hasItem()) {
      this.visitNextPoint();
    }

    if (this.steps === undefined) {
      throw new Error("Cannot find path to destination");
    }

    return this.steps;
  }
}
