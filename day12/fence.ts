const garden = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((row) => row.split(""));

const visited: Set<string> = new Set();
let price = 0;

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function explore(x: number, y: number): number[] {
  const id = [x, y].join(",");
  if (visited.has(id)) return [0, 0];
  visited.add(id);

  let area = 1;
  let perim = 0;

  directions.forEach(([dx, dy]) => {
    const xN = x + dx;
    const yN = y + dy;
    if (garden[xN] && garden[xN][yN] === garden[x][y]) {
      const [aN, pN] = explore(xN, yN);
      area += aN;
      perim += pN;
    } else {
      perim += 1;
    }
  });

  return [area, perim];
}

for (let i = 0; i < garden.length; i++) {
  for (let j = 0; j < garden[i].length; j++) {
    const [area, perim] = explore(i, j);
    price += area * perim;
  }
}

console.log(price);
