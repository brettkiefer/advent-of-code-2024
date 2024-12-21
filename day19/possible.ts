const input = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .filter((x) => x.length > 0);

const towels = input[0].split(", ");
const patterns = input.slice(1);

function possible(pattern: string): boolean {
  const solvedAt: boolean[] = Array(pattern.length).fill(false, 0);
  for (let i = 0; i < pattern.length; i++) {
    if (i === 0 || solvedAt[i - 1]) {
      towels.forEach((towel) => {
        if (pattern.slice(i, i + towel.length) === towel) {
          solvedAt[i + towel.length - 1] = true;
        }
      });
    }
  }
  return solvedAt[solvedAt.length - 1];
}

const allPossible = patterns.filter(possible);

console.log(allPossible.length);
