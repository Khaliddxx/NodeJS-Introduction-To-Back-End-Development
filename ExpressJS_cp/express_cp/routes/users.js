var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
    console.log(req.ahmed);
    res.send(req.ahmed);
});

module.exports = router;
