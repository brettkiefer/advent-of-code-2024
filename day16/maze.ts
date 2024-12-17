const maze = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((line) => line.length > 0)
  .map((line) => line.split(""));

function findChar(maze: string[][], c: string): number[] {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === c) return [x, y];
    }
  }
  throw new Error("No start found");
}

const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

function id(pos: number[], dir: number) {
  return pos.concat([dir]).join(",");
}

const minScores: Map<string, number> = new Map();
const toExplore = [];
function walkMaze(
  maze: string[][],
  [x, y]: number[],
  dir: number,
  score: number,
) {
  if (maze[y][x] === "#") {
    return;
  }
  const [dx, dy] = directions[dir];
  const idPos = id([x, y], dir);
  const posScoreMin = minScores.get(idPos);
  if (posScoreMin !== undefined && posScoreMin <= score) {
    return;
  }
  minScores.set(idPos, score);
  toExplore.push([[x + dx, y + dy], dir, score + 1]);
  toExplore.push([[x, y], (dir + 3) % 4, score + 1000]);
  toExplore.push([[x, y], (dir + 1) % 4, score + 1000]);
}

toExplore.push([findChar(maze, "S"), 1, 0]);

while (toExplore.length > 0) {
  walkMaze(maze, ...toExplore.shift());
}
const end = findChar(maze, "E");

let minScore = Infinity;
for (let i = 0; i < directions.length; i++) {
  const score = minScores.get(id(end, i));
  if (!score) {
    throw new Error("No minScore found");
  }
  if (score < minScore) {
    minScore = score;
  }
}

console.log(minScore);
