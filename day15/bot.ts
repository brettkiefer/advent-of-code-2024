const [mapText, movesText] = Deno.readTextFileSync(Deno.args[0])
  .split(/\n\n/);

const board: string[][] = mapText
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(""));

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
  [y, x]: number[],
  [dy, dx]: number[],
): boolean {
  const nextY = y + dy;
  const nextX = x + dx;
  const obs = board[nextY][nextX];
  if (obs === "O" && move(board, [nextY, nextX], [dy, dx]) || obs === ".") {
    board[nextY][nextX] = board[y][x];
    board[y][x] = ".";
    return true;
  }
  return false;
}

function botPos(board: string[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "@") return [i, j];
    }
  }
  throw new Error("No bot found");
}

showBoard(board);
moves.split("").forEach((moveStr: string) => {
  move(board, botPos(board), directions.get(moveStr) ?? []);
});
showBoard(board);

let score = 0;
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    if (board[i][j] === "O") score += i * 100 + j;
  }
}

console.log(score);
