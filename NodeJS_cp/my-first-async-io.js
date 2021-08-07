const fs = require("fs");

const data = fs.readFile(process.argv[2], (err, data) => {
  if (err) {
    console.error();
  } else {
    const endlineCount = data.toString().split("\n").length - 1;
    console.log(endlineCount);
  }
});
