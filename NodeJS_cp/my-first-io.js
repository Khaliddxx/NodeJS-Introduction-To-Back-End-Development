const fs = require("fs");

const data = fs.readFileSync(process.argv[2]).toString();
const endlineCount = data.split("\n").length - 1;

console.log(endlineCount);
