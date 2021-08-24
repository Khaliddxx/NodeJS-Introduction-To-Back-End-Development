const fs = require("fs");

let listItems;

fs.readdir(process.argv[2], (err, list) => {
  if (err) {
    console.error(err);
  } else {
    listItems = list.filter((item) => item.includes(`.${process.argv[3]}`));
    listItems.forEach((item) => console.log(item));
  }
});
