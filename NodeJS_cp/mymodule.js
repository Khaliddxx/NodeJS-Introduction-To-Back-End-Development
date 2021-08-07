const fs = require("fs");

module.exports = function (dirName, extension, cb) {
  let listItems;

  fs.readdir(dirName, (err, list) => {
    if (err) {
      cb(err);
    } else {
      listItems = list.filter((item) => item.includes(`.${extension}`));
      //   listItems.forEach((item) => console.log(item));
      cb(null, listItems);
    }
  });
};
