let doMuls = true;
let acc = 0;

Deno.readTextFileSync(Deno.args[0])
  .matchAll(/(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g)
  .forEach((inst) => {
    if (inst[0] === "do()") {
      doMuls = true
    } else if (inst[0] === "don't()") {
      doMuls = false;
    } else {
      if (doMuls) {
        acc += parseInt(inst[2]) * parseInt(inst[3]);
      }
    }
  });

console.log(acc);
