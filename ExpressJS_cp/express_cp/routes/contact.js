var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("contact", { number: "01155007462" });
});

module.exports = router;
