function fewestTokens([ax, ay, bx, by, px, py]: number[]): number {
  let best = 0;
  for (let a = 0; ax * a <= px && ay * a <= py; a++) {
    const dx = px - (a * ax);
    const dy = py - (a * ay);
    if (dx % bx === 0 && dy % by === 0 && dx / bx === dy / by) {
      best = 3 * a + dx / bx;
    }
  }
  console.log({ prize: [px, py], best });
  return best;
}

const machines = Deno.readTextFileSync(Deno.args[0])
  .split(/\n\n/)
  .map((s) =>
    /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/
      .exec(s)
  )
  .map((m) => m && m.slice(1, 7))
  .map((ns) => ns && ns.map((n) => parseInt(n)))
  .filter((x) => x && x.length > 5)
  .map(fewestTokens)
  .reduce((acc, t) => acc + t);

console.log(machines);
