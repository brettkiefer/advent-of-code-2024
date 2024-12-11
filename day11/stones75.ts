const stones = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)[0]
  .split(" ")
  .map((x) => parseInt(x));

console.log(stones);

function addStones(stone: number, count: number, m: Map<number, number>) {
  m.set(stone, (m.get(stone) ?? 0) + count);
}

function countStones(m: Map<number, number>): number {
  return Array.from(m.values()).reduce((acc, count) => acc + count);
}

let stoneMap = new Map<number, number>();
stones.forEach((stone) => addStones(stone, 1, stoneMap));

function blink(stoneMap: Map<number, number>): Map<number, number> {
  const nextMap = new Map<number, number>();
  stoneMap.forEach((count, stone) => {
    if (stone === 0) {
      addStones(1, count, nextMap);
      return;
    }
    const s: string = stone.toString();
    if (s.length % 2 == 0) {
      const half = s.length / 2;
      addStones(parseInt(s.slice(0, half)), count, nextMap);
      addStones(parseInt(s.slice(half)), count, nextMap);
      return;
    }

    addStones(stone * 2024, count, nextMap);
  });
  return nextMap;
}

for (let i = 0; i < 75; i++) {
  stoneMap = blink(stoneMap);
  console.log({ blinks: i + 1, count: countStones(stoneMap) });
}
