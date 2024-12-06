const text = Deno.readTextFileSync(Deno.args[0]);
const lines = text.split(/\n/);

const dividerLine = lines.indexOf("");

const rules = lines.slice(0, dividerLine)
  .map((line) => {
    return line.split("|").map((x) => parseInt(x));
  });

const prints = lines.slice(dividerLine + 1)
  .filter((line) => line.length > 0)
  .map((line) => {
    return line.split(",").map((x) => parseInt(x));
  });

function followsRules(aTest: number, bTest: number): boolean {
  return rules.every(([a, b]) => !(b === aTest && a === bTest));
}

function legalPrint(print: number[]): boolean {
  if (print.length === 1) {
    return true;
  }
  const p1 = print[0];
  const rest = print.slice(1);
  return rest.every((p) => followsRules(p1, p)) && legalPrint(rest);
}

const badPrints = prints.filter((p) => !legalPrint(p));

function fixPrint(print: number[]): number[] {
  if (print.length === 1) {
    return print;
  }

  const p1 = print[0];
  const fixedRest = fixPrint(print.slice(1));
  const lastPred = fixedRest
    .findLastIndex((p) => rules.find(([a, b]) => p === a && p1 === b));
  return fixedRest.toSpliced(lastPred + 1, 0, p1);
}

const fixedPrints = badPrints.map(fixPrint);
const middles = fixedPrints.map((xs) => xs[Math.trunc(xs.length / 2)]);
const sum = middles.reduce((acc: number, x: number) => acc += x, 0);

console.log(sum);
