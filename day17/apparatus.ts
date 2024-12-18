const input = Deno.readTextFileSync(Deno.args[0])
  .split(/\n/)
  .map((line) => line.split(": ")[1]);

let [A, B, C] = input.slice(0, 3).map((x) => BigInt(parseInt(x)));

const program = input[4].split(",").map((x) => parseInt(x));

const combo = (oper: number) => {
  if (oper > 7 || oper < 0) {
    throw new Error("Bad operator: 7");
  }
  return [0n, 1n, 2n, 3n, A, B, C][oper];
};

const output = [];
let ptr = 0;
while (ptr < program.length) {
  const inst = program[ptr];
  const oper = program[ptr + 1];
  ptr += 2;
  switch (inst) {
    case 0:
      A = BigInt(Math.trunc(Number(A) / Math.pow(2, Number(combo(oper)))));
      break;
    case 1:
      B = B ^ BigInt(oper);
      break;
    case 2:
      B = BigInt(combo(oper) % BigInt(8));
      break;
    case 3:
      if (A !== 0n) ptr = Number(oper);
      break;
    case 4:
      B = BigInt(B) ^ BigInt(C);
      break;
    case 5:
      output.push(Number(combo(oper) % 8n));
      break;
    case 6:
      B = BigInt(Math.trunc(Number(A) / Math.pow(2, Number(combo(oper)))));
      break;
    case 7:
      C = BigInt(Math.trunc(Number(A) / Math.pow(2, Number(combo(oper)))));
      break;
  }
}

console.log(output.join(","));
