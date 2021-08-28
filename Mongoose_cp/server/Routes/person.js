import express from "express";

var router = express.Router;

router.get("/", function (req, res) {
  res.render("yuss person");
});

export default router;
