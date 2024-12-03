const text = Deno.readTextFileSync(Deno.args[0]);

const tests = text.split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(/ /).map((x) => parseInt(x)));

function direction(diff: number) {
  return diff / Math.abs(diff);
}

const safeTests = tests.filter((test) => {
  const dir = direction(test[0] - test[1]);
  for (let i = 0; i < test.length - 1; i++) {
    const diff = test[i] - test[i + 1];
    const absDiff = Math.abs(diff);
    if (direction(diff) !== dir || absDiff > 3 || absDiff < 1) {
      return false;
    }
  }
  return true;
});

console.log(safeTests.length);
