var sum = process.argv
  .slice(2)
  .reduce((accumulator, currentValue) => accumulator + Number(currentValue), 0);

console.log(sum);
