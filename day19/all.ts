const input = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0);

const towels = input[0].split(", ");
const patterns = input.slice(1);

function nPossible(pattern: string): bigint {
  const solvedAt: bigint[] = Array(pattern.length).fill(0n, 0);
  for (let i = 0; i < pattern.length; i++) {
    if (i === 0 || solvedAt[i - 1] > 0n) {
      towels.forEach((towel) => {
        if (pattern.slice(i, i + towel.length) === towel) {
          solvedAt[i + towel.length - 1] += i === 0 ? 1n : solvedAt[i - 1];
        }
      });
    }
  }
  return solvedAt[solvedAt.length - 1];
}

const all = patterns.map(nPossible);
console.log(all.reduce((sum, n) => sum + n));
