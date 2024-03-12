#!/usr/bin/env node

for (let cnt = 1; cnt <= 20; cnt++) {
  let output = "";
  if (cnt % 3 == 0) output += "Fizz";
  if (cnt % 5 == 0) output += "Buzz";
  console.log(output || String(cnt));
}
