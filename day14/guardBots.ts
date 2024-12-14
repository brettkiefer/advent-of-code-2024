const mapWidth = 101;
const mapHeight = 103;

function oneTurn([x, y, dx, dy]: number[]) {
  let xMoved = x + dx;
  xMoved = (xMoved < 0 ? mapWidth + xMoved : xMoved) % mapWidth;
  let yMoved = y + dy;
  yMoved = (yMoved < 0 ? mapHeight + yMoved : yMoved) % mapHeight;
  return [xMoved, yMoved, dx, dy];
}

function quadrant([x, y]: number[]): number {
  if (x < mapWidth / 2 - 1 && y < mapHeight / 2 - 1) {
    return 0;
  }
  if (x > mapWidth / 2 && y < mapHeight / 2 - 1) {
    return 1;
  }
  if (x > mapWidth / 2 && y > mapHeight / 2) {
    return 2;
  }
  if (x < mapWidth / 2 - 1 && y > mapHeight / 2) {
    return 3;
  }
  return 4;
}

let robots = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .map((line) => line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/))
  .filter((x) => !!x)
  .map((rematch) => rematch.slice(1, 5).map((x) => parseInt(x)));

for (let i = 0; i < 100; i++) {
  robots = robots.map(oneTurn);
}

const quadrants: number[] = [0, 0, 0, 0, 0];

robots.forEach((bot) => {
  return quadrants[quadrant(bot)]++;
});
console.log(quadrants.slice(0, -1).reduce((acc, x) => acc * x, 1));
