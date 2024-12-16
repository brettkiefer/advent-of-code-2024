const [mapText, movesText] = Deno.readTextFileSync(Deno.args[0])
  .split(/\n\n/);

const board: string[][] = mapText
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => {
    return line.split("")
      .flatMap((ch) => {
        if (ch === "#") return "##".split("");
        if (ch === ".") return "..".split("");
        if (ch === "@") return "@.".split("");
        if (ch === "O") return "[]".split("");
        throw new Error("Unknown board character");
      });
  });

const moves = movesText.split(/\n/).join("");

function showBoard(board: string[][]) {
  board.forEach((line) => console.log(line.join("")));
}

const directions: Map<string, number[]> = new Map();
directions.set("<", [0, -1]);
directions.set("^", [-1, 0]);
directions.set(">", [0, 1]);
directions.set("v", [1, 0]);

function move(
  board: string[][],
  edge: number[][],
  [dy, dx]: number[],
): boolean {
  if (edge.length === 0) return true;

  if (edge.some(([y, x]) => board[y + dy][x + dx] === "#")) {
    return false;
  }

  const edgeNext: number[][] = edge.flatMap(([y, x]) => {
    const nextY = y + dy;
    const nextX = x + dx;
    const obs = board[nextY][nextX];
    if (dx !== 0 && ["[", "]"].includes(obs)) {
      return [[nextY, nextX]];
    }
    // Vertical move, adjust for width of box
    if (obs === "[") {
      return [[nextY, nextX], [nextY, nextX + 1]];
    } else if (obs === "]") {
      return [[nextY, nextX - 1], [nextY, nextX]];
    }
    return [];
  }).filter((coords, ix, all) => {
    return all.map((x) => x.join(",")).indexOf(coords.join(",")) === ix;
  });

  if (!move(board, edgeNext, [dy, dx])) return false;

  edge.forEach(([y, x]) => {
    board[y + dy][x + dx] = board[y][x];
    board[y][x] = ".";
  });

  return true;
}

function botPos(board: string[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "@") return [i, j];
    }
  }
  throw new Error("No bot found");
}

moves.split("").forEach((moveStr: string) => {
  move(board, [botPos(board)], directions.get(moveStr) ?? []);
});
showBoard(board);

let score = 0;
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    if (board[i][j] === "[") score += i * 100 + j;
  }
}

console.log(score);
