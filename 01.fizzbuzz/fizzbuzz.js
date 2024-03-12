#!/usr/bin/env node

for (let count = 1; count <= 20; count++) {
  let output = "";
  if (count % 3 === 0) output += "Fizz";
  if (count % 5 === 0) output += "Buzz";

  if (output === "") output = String(count);
  console.log(output);
}
