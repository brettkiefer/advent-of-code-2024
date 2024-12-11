let stones = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)[0]
  .split(" ")
  .map((x) => parseInt(x));

console.log(stones);

function blink(stones: number[]) {
  return stones.flatMap((stone: number) => {
    if (stone === 0) {
      return [1];
    }
    const s: string = stone.toString();
    if (s.length % 2 == 0) {
      const half = s.length / 2;
      return [parseInt(s.slice(0, half)), parseInt(s.slice(half))];
    }
    return [stone * 2024];
  });
}

for (let i = 0; i < 25; i++) {
  stones = blink(stones);
  console.log({ blinks: i + 1, count: stones.length });
}
