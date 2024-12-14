const mapWidth = 101;
const mapHeight = 103;

function oneTurn([x, y, dx, dy]: number[]) {
  let xMoved = x + dx;
  xMoved = (xMoved < 0 ? mapWidth + xMoved : xMoved) % mapWidth;
  let yMoved = y + dy;
  yMoved = (yMoved < 0 ? mapHeight + yMoved : yMoved) % mapHeight;
  return [xMoved, yMoved, dx, dy];
}

function showMap(robots: number[][]): boolean {
  const lines: number[][] = Array.from({ length: mapHeight }, () => {
    return Array.from({ length: mapWidth }, () => 0);
  });

  robots.forEach((bot: number[]) => lines[bot[1]][bot[0]] += 1);

  const organized = lines.filter((line) => {
    return line.map((x) => x.toString()).join("").match(/1{10,}/);
  });

  if (organized.length > 10) {
    lines.forEach((line) => {
      console.log(line.map((x) => x === 0 ? "." : x.toString()).join(""));
    });
    return true;
  }
  return false;
}

let robots = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .map((line) => line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/))
  .filter((x) => !!x)
  .map((rematch) => rematch.slice(1, 5).map((x) => parseInt(x)));

for (let i = 0; i < 10000; i++) {
  robots = robots.map(oneTurn);
  //console.log(i);
  if (showMap(robots)) {
    console.log({ turn: i + 1 });
  }
}
