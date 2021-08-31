import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: String,
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
