const text = Deno.readTextFileSync(Deno.args[0]);
const lines = text.split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(""));

const antennaMap: Map<string, number[][]> = new Map();

for (let x = 0; x < lines.length; x++) {
  for (let y = 0; y < lines[x].length; y++) {
    const c = lines[x][y];
    if (c !== ".") {
      const antennas = antennaMap.get(c) ?? [];
      antennas.push([x, y]);
      antennaMap.set(c, antennas);
    }
  }
}

function distance([ax, ay]: number[], [bx, by]: number[]): number {
  return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
}

function inLine(a: number[], b: number[], c: number[]): boolean {
  const ps = [a, b, c].sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
  return distance(ps[0], ps[1]) + distance(ps[1], ps[2]) ===
    distance(ps[0], ps[2]);
}

function doubleDist(a: number[], b: number[], c: number[]): boolean {
  return distance(a, c) === 2 * distance(b, c) ||
    2 * distance(a, c) === distance(b, c);
}

const antiNodes = [];
for (let x = 0; x < lines.length; x++) {
  for (let y = 0; y < lines[x].length; y++) {
    if (
      Array.from(antennaMap).some(([, locs]) => {
        for (let l1 = 0; l1 < locs.length; l1++) {
          for (let l2 = l1 + 1; l2 < locs.length; l2++) {
            if (
              inLine(locs[l1], locs[l2], [x, y]) &&
              doubleDist(locs[l1], locs[l2], [x, y])
            ) {
              return true;
            }
          }
        }
        return false;
      })
    ) {
      antiNodes.push([x, y]);
    }
  }
}

console.log(antiNodes);
console.log(antiNodes.length);
