const text = Deno.readTextFileSync(Deno.args[0]);
const lines = text.split(/\n/)
  .filter((x) => x.length > 0);

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function findWord(
  word: string,
  lines: string[],
  x: number,
  y: number,
  direction: number[],
): boolean {
  if (word.length === 0) {
    return true;
  }
  if (x < 0 || x >= lines.length || y < 0 || y >= lines[x].length) {
    return false;
  }
  const letter = word.charAt(0);
  const rest = word.slice(1);
  if (letter != lines[x][y]) {
    return false;
  }
  return findWord(rest, lines, x + direction[0], y + direction[1], direction);
}

let count = 0;
for (let xx = 0; xx < lines.length; xx++) {
  for (let xy = 0; xy < lines[xx].length; xy++) {
    for (let d = 0; d < directions.length; d++) {
      if (findWord("XMAS", lines, xx, xy, directions[d])) {
        count += 1;
      }
    }
  }
}
console.log(count);
