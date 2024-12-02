const text = Deno.readTextFileSync(Deno.args[0]);
const lines = text.split(/\n/)
  .filter((x) => x.length > 0)
  .map((line) => line.split(/[ ]+/));
const list1 = lines.map((line) => parseInt(line[0])).sort((a, b) => a - b);
const list2 = lines.map((line) => parseInt(line[1])).sort((a, b) => a - b);
let sim = 0;
for (let i = 0; i < list1.length; i++) {
  const x = list1[i];
  sim += x * (list2.filter((y) => y === x)).length;
}

console.log(sim);
