console.log(
  Deno.readTextFileSync(Deno.args[0])
    .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
    .reduce((acc, mul) => acc + parseInt(mul[1]) * parseInt(mul[2]), 0)
)
