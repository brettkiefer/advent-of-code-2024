const text = Deno.readTextFileSync(Deno.args[0]);

const tests = text.split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(/ /).map((x) => parseInt(x)));

function direction(diff: number) {
  return diff / Math.abs(diff);
}

function isTestSafe(test: number[]): boolean {
  const dir = direction(test[0] - test[1]);
  for (let i = 0; i < test.length - 1; i++) {
    const diff = test[i] - test[i + 1];
    const absDiff = Math.abs(diff);
    if (direction(diff) !== dir || absDiff > 3 || absDiff < 1) {
      return false;
    }
  }
  return true;
}

function isTestSafeWithDampener(test: number[]): boolean {
  for (let i = 0; i < test.length; i++) {
    if (isTestSafe(test.slice(0, i).concat(test.slice(i + 1)))) {
      return true;
    }
  }
  return false;
}
const safeTests = tests.filter((test) => {
  return isTestSafe(test) || isTestSafeWithDampener(test);
});

console.log(safeTests.length);
