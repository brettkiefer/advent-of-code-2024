const topoMap = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split("").map((x) => parseInt(x)));

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const trailheads = [];
for (let x = 0; x < topoMap.length; x++) {
  for (let y = 0; y < topoMap[x].length; y++) {
    if (topoMap[x][y] === 0) {
      trailheads.push([x, y]);
    }
  }
}

function squareScore([x, y]: number[]): number {
  const n = topoMap[x][y];
  if (n === 9) return 1;
  return directions
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([x, y]) => topoMap[x] && topoMap[x][y] === n + 1)
    .map(squareScore)
    .reduce((acc, score) => acc + score, 0);
}

const scores = trailheads.map(squareScore);

console.log(scores.reduce((acc, s) => acc + s, 0));
