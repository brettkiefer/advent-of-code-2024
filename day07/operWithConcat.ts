const lines = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(/[:? ]+/).map((x) => parseInt(x)));

function evalAll(xs: number[]): number[] {
  if (xs.length === 1) {
    return xs;
  }

  const x = xs[0];
  const rest = xs.slice(1);
  const subs = evalAll(rest);
  return subs.map((sub) => x + sub)
    .concat(subs.map((sub) => x * sub))
    .concat(subs.map((sub) => parseInt(sub.toString() + x.toString())));
}

const valid = lines.filter((line) => {
  return evalAll(line.slice(1).reverse()).indexOf(line[0]) > -1;
});

console.log(valid.reduce((acc, xs) => acc + xs[0], 0));
