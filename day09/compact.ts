const input = Deno.readTextFileSync(Deno.args[0]).split(/\n/)[0];

let id = 0;
let free = false;
const drive = input.split("").flatMap((x) => {
  const sec = [];
  for (let i = 0; i < parseInt(x); i++) {
    sec.push(free ? NaN : id);
  }
  if (!free) {
    ++id;
  }
  free = !free;
  return sec;
});

let p1 = 0;
let p2 = drive.length - 1;

while (p1 < p2) {
  while (!Number.isNaN(drive[p1])) {
    ++p1;
  }
  while (Number.isNaN(drive[p2])) {
    --p2;
  }
  if (p1 < p2) {
    drive[p1] = drive[p2];
    drive[p2] = NaN;
  }
}

console.log(
  drive.reduce((acc, id, ix) => Number.isNaN(id) ? acc : acc + id * ix),
);
