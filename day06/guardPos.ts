const text = Deno.readTextFileSync(Deno.args[0]);
const map = text.split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(""));

const directions = {
  "^": [-1, 0],
  ">": [0, 1],
  "v": [1, 0],
  "<": [0, -1],
};

const directionKeys = Object.keys(directions);

let guardPos: number[] = [];
let guardDir: string = "";

for (let x = 0; x < map.length; x++) {
  for (let y = 0; y < map[x].length; y++) {
    const ch = map[x][y];
    if (directionKeys.includes(ch)) {
      guardPos = [x, y];
      guardDir = ch;
    }
  }
}

while (
  guardPos[0] >= 0 &&
  guardPos[0] < map.length &&
  guardPos[1] >= 0 &&
  guardPos[1] < map[guardPos[0]].length
) {
  console.log(guardPos);
  const guardPosNext = [
    guardPos[0] + directions[guardDir][0],
    guardPos[1] + directions[guardDir][1],
  ];
  console.log(guardPosNext);
  if (map[guardPosNext[0]] && map[guardPosNext[0]][guardPosNext[1]] === "#") {
    guardDir = directionKeys[
      (directionKeys.indexOf(guardDir) + 1) % directionKeys.length
    ];
  } else {
    map[guardPos[0]][guardPos[1]] = "X";
    guardPos = guardPosNext;
  }
}

const count = map
  .map((line) => line.join(""))
  .join("")
  .match(/X/g)
  .length;

console.log({ count });
