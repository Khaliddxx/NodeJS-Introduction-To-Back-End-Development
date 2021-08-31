import express from "express";
import bodyParser from "body-parser";
import userModel from "./models/User.js";
import mongoose from "mongoose";
import env from "dotenv";
env.config();

const app = express();

mongoose.connect(
  process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connection Successful")
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/getUsers", async (req, res) => {
  const data = await userModel.find();
  res.send(data);
});

app.post("/add-user", async (req, res, next) => {
  const body = req.body;
  const user = new userModel({
    id: body.id,
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    age: body.age,
    email: body.email,
  });
  const result = await user.save();
  res.send(user);
});

app.put("/update-user/{id}", async (req, res, next) => {
  const id = req.params.id;
  const doc = await userModel.findOneAndUpdate(id, req.body, { new: true });
  res.send(userModel.find(id));
  res.send(doc);
});

app.delete("/delete-user/{id}", async (req, res, next) => {
  //   const doc = await userModel.find(req.params.id);
  const deleteUser = await userModel.findByIdAndRemove(
    // doc._id,
    req.params.id,
    (err, output) => {
      if (err) {
        return next(err);
      }
      res.send(output === 1 ? { msg: "success" } : { msg: "error" });
    }
  );
});

app.listen(3000, () => console.log("server running successfully"));
