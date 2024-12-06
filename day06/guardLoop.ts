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

let guardPosInit: number[] = [];
let guardDirInit: string = "";

for (let x = 0; x < map.length; x++) {
  for (let y = 0; y < map[x].length; y++) {
    const ch = map[x][y];
    if (directionKeys.includes(ch)) {
      guardPosInit = [x, y];
      guardDirInit = ch;
    }
  }
}

// Yes, there is a MUCH faster way to do this with a stack of guard moves
// but computers are super-fast so let's do it this junky way and just
// try every possibility and use 10k moves as a proxy for "must be looping
// infinitely". Brute force!!
const obstructions = [];
for (let x = 0; x < map.length; x++) {
  for (let y = 0; y < map[x].length; y++) {
    if (map[x][y] === ".") {
      let guardPos = guardPosInit.slice();
      let guardDir = guardDirInit;
      map[x][y] = "#";
      let moveCount = 0;
      while (
        guardPos[0] >= 0 &&
        guardPos[0] < map.length &&
        guardPos[1] >= 0 &&
        guardPos[1] < map[guardPos[0]].length &&
        moveCount < 10000
      ) {
        const guardPosNext = [
          guardPos[0] + directions[guardDir][0],
          guardPos[1] + directions[guardDir][1],
        ];
        if (
          map[guardPosNext[0]] && map[guardPosNext[0]][guardPosNext[1]] === "#"
        ) {
          guardDir = directionKeys[
            (directionKeys.indexOf(guardDir) + 1) % directionKeys.length
          ];
        } else {
          guardPos = guardPosNext;
          moveCount++;
        }
      }
      console.log([x, y, moveCount]);
      if (moveCount === 10000) {
        obstructions.push([x, y]);
      }
      map[x][y] = ".";
    }
  }
}

console.log({ obstructions, length: obstructions.length });
