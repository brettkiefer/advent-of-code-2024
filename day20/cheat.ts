const course: string[][] = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(""));

let [startX, startY] = [0, 0];

for (let y = 0; y < course.length; y++) {
  for (let x = 0; x < course.length; x++) {
    if (course[y][x] === "S") {
      [startX, startY] = [x, y];
    }
  }
}

const times: number[][] = Array(course.length)
  .fill([]).map(() => Array(course[0].length).fill(-1));

let [x, y] = [startX, startY];
let [prevX, prevY] = [x, y];

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let time = 0;

times[y][x] = time;
while (course[y][x] !== "E") {
  ++time;
  const [dx, dy] = directions.find(([dx, dy]) => {
    return ([".", "E"].includes(course[y + dy][x + dx]) &&
      !(x + dx === prevX && y + dy === prevY));
  });
  [prevX, prevY] = [x, y];
  x = x + dx;
  y = y + dy;
  times[y][x] = time;
}

[x, y] = [startX, startY];
[prevX, prevY] = [x, y];
const shortcuts: Map<number, number> = new Map();
let shortcutCount = 0;
while (course[y][x] !== "E") {
  directions.forEach(([dx, dy]) => {
    if (course[y + dy][x + dx] === "#") {
      if (times[y + dy * 2] && times[y + dy * 2][x + dx * 2]) {
        const dt = times[y + dy * 2][x + dx * 2] - times[y][x] - 2;
        if (dt >= 100) {
          const curr = shortcuts.get(dt) ?? 0;
          shortcuts.set(dt, curr + 1);
          shortcutCount++;
        }
      }
    }
  });
  const [dx, dy] = directions.find(([dx, dy]) => {
    return ([".", "E"].includes(course[y + dy][x + dx]) &&
      !(x + dx === prevX && y + dy === prevY));
  });
  [prevX, prevY] = [x, y];
  x = x + dx;
  y = y + dy;
}

console.log(shortcuts);
console.log(shortcutCount);
