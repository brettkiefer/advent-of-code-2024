import * as mathjs from "npm:mathjs";

function fewestTokens([ax, ay, bx, by, px, py]: number[]): number {
  px += 10000000000000;
  py += 10000000000000;

  // Find the intersection of the A button line from the origin and the B
  // Button line back from the prize point.
  const [intxPrecise, intyPrecise] = mathjs.intersect(
    [0, 0],
    [100 * ax, 100 * ay],
    [px - (bx * 100), py - (by * 100)],
    [px, py],
  );
  const intx = Math.round(intxPrecise);
  const inty = Math.round(intyPrecise);
  if (
    Math.abs(intx - intxPrecise) > 0.01 ||
    Math.abs(inty - intyPrecise) > 0.01
  ) {
    return 0;
  }

  const a = Math.floor(intx / ax);
  const b = Math.floor((px - intx) / bx);

  // Check because precision issues
  if (a * ax + b * bx === px && a * ay + b * by === py) {
    return a * 3 + b;
  }

  return 0;
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
