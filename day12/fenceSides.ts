const garden = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((row) => row.split(""));

const visited: Set<string> = new Set();
const edges: Set<string> = new Set();

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function followEdge(x: number, y: number, dx: number, dy: number): number {
  const contents = garden[x][y];
  while (
    garden[x] && garden[x][y] === contents &&
    (!garden[x + dx] || garden[x + dx][y + dy] !== contents)
  ) {
    if (Math.abs(dx) === 1) {
      y--;
    } else {
      x--;
    }
  }
  const edgeId = [x, y, dx, dy, contents].join(",");
  if (edges.has(edgeId)) {
    return 0;
  }
  edges.add(edgeId);
  return 1;
}

function explore(x: number, y: number): number[] {
  const id = [x, y].join(",");
  if (visited.has(id)) return [0, 0];
  visited.add(id);

  let area = 1;
  let edges = 0;

  directions.forEach(([dx, dy]) => {
    const xN = x + dx;
    const yN = y + dy;
    if (garden[xN] && garden[xN][yN] === garden[x][y]) {
      const [aN, eN] = explore(xN, yN);
      area += aN;
      edges += eN;
    } else {
      edges += followEdge(x, y, dx, dy);
    }
  });

  return [area, edges];
}

let price = 0;
for (let i = 0; i < garden.length; i++) {
  for (let j = 0; j < garden[i].length; j++) {
    const [area, edges] = explore(i, j);
    price += area * edges;
  }
}

console.log(price);
