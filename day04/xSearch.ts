const text = Deno.readTextFileSync(Deno.args[0]);
const lines = text.split(/\n/)
  .filter((x) => x.length > 0);

const xSpots = [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];

function isXMAS(lines: string[], x: number, y: number): boolean {
  if (lines[x].charAt(y) !== "A") {
    return false;
  }

  const corners = xSpots.map(([xShift, yShift]) => {
    if (!lines[x + xShift]) {
      return " ";
    }
    return lines[x + xShift].charAt(y + yShift) ?? " ";
  });

  if (["MMSS", "SMMS", "SSMM", "MSSM"].includes(corners.join(""))) {
    return true;
  }

  return false;
}

let count = 0;
for (let xx = 0; xx < lines.length; xx++) {
  for (let xy = 0; xy < lines[xx].length; xy++) {
    if (isXMAS(lines, xx, xy)) {
      count += 1;
    }
  }
}
console.log(count);
