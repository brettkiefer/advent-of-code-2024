class HDFile {
  id: number;
  len: number;

  constructor(id: number, len: number) {
    this.id = id;
    this.len = len;
  }
}

function joinFree(d: HDFile[]) {
  for (let i = 0; i < d.length - 1; ++i) {
    while (
      Number.isNaN(drive[i].id) && drive[i + 1] && Number.isNaN(drive[i + 1].id)
    ) {
      drive[i].len += drive[i + 1].len;
      drive.splice(i + 1, 1);
    }
  }
}

const input = Deno.readTextFileSync(Deno.args[0]).split(/\n/)[0];

let id = 0;
let sec = 0;
let free = false;
const drive = input.split("").map((x) => {
  const file = new HDFile(free ? NaN : id++, parseInt(x));
  free = !free;
  sec += file.len;
  return file;
}).filter((f) => f.len !== 0);

for (
  let idMove = drive[drive.length - 1].id || drive[drive.length - 2].id;
  idMove >= 0;
  idMove--
) {
  for (let i = 0; i < drive.length; i++) {
    const f = drive[i];
    if (f.id === idMove) {
      for (let j = 0; j < i; j++) {
        const block = drive[j];
        if (Number.isNaN(block.id) && block.len >= f.len) {
          drive.splice(i, 1, new HDFile(NaN, f.len));
          drive.splice(j, 0, f);
          block.len -= f.len;
          if (block.len === 0) {
            drive.splice(j + 1, 1);
          }
          break;
        }
      }
      break;
    }
  }
  joinFree(drive);
}

let ix = 0;
const sum = drive.reduce(
  (acc, f) => {
    if (Number.isNaN(f.id)) {
      ix = ix + f.len;
      return acc;
    }
    let x = 0;
    for (let i = 0; i < f.len; i++) {
      x += ix * f.id;
      ++ix;
    }
    return acc + x;
  },
  0,
);

console.log(sum);
