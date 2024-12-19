import dijkstra from "https://deno.land/x/dijkstra/mod.ts";

const startPos: [number, number] = [0, 0];
const endPos: [number, number] = [70, 70];
const bytesLength = 1024;

const bytes = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(",").map((x) => parseInt(x)))
  .slice(0, bytesLength);

const grid = Array.from(Array(endPos[1] + 1), () => {
  return new Array(endPos[0] + 1).fill(".");
});

bytes.forEach(([x, y]) => grid[y][x] = "#");

function showGrid() {
  grid.forEach((line) => console.log(line.join("")));
}

const directions = [
  [0, -1], [ 1, 0], [0, 1], [-1, 0]
];

function id(pos:number[]):string {
  return pos.join(",");
}

const graph: { [key: string]: { [key: string]: number } } = {};

grid.forEach((line, y) => {
  line.forEach((_ , x) => {
    const edges: { [key: string]: number } = {};
    directions.forEach(([dx, dy]) => {
      const xv = x + dx;
      const yv = y + dy;
      if (yv >= 0 && yv < grid.length && xv >= 0 && xv < grid[y].length &&
          grid[yv][xv] !== "#" ) {
          edges[id([xv, yv])] = 1;
      }
    });
    graph[id([x, y])] = edges;
  });
});

showGrid();
const path = dijkstra.find_path(graph, id(startPos), id(endPos));
console.log(path);
path.forEach((s) => {
  const [x, y] = s.split(",").map((x) => parseInt(x));
  grid[y][x] = "O";
});
showGrid();
console.log(path.length - 1);
