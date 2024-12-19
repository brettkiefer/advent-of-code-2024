import dijkstra from "https://deno.land/x/dijkstra/mod.ts";

const startPos: [number, number] = [0, 0];
const endPos: [number, number] = [70, 70];

const bytes = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(",").map((x) => parseInt(x)));

function blocked(ix: number) {
  const grid = Array.from(Array(endPos[1] + 1), () => {
    return new Array(endPos[0] + 1).fill(".");
  });

  bytes.slice(0, ix).forEach(([x, y]) => grid[y][x] = "#");

  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  function id(pos: number[]): string {
    return pos.join(",");
  }

  const graph: { [key: string]: { [key: string]: number } } = {};

  grid.forEach((line, y) => {
    line.forEach((_, x) => {
      const edges: { [key: string]: number } = {};
      directions.forEach(([dx, dy]) => {
        const xv = x + dx;
        const yv = y + dy;
        if (
          yv >= 0 && yv < grid.length && xv >= 0 && xv < grid[y].length &&
          grid[yv][xv] !== "#"
        ) {
          edges[id([xv, yv])] = 1;
        }
      });
      graph[id([x, y])] = edges;
    });
  });

  let path = null;
  try {
    path = dijkstra.find_path(graph, id(startPos), id(endPos));
  } catch {
    return true;
  }

  console.log({ ix, length: path && path.length });
  return false;
}

// Binary search would work but it'd take longer to implement
// than to watch this run.
let firstBlock = 0;
while (!blocked(firstBlock)) ++firstBlock;
console.log({ index: firstBlock, pos: bytes[firstBlock] });
