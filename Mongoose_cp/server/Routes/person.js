import express from "express";

var router = express.Router();

router.get("/", (req, res) => {
  res.send("yuss person");
});

export default router;
