import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  age: Number,
  favFoods: [String],
});

const PersonModel = mongoose.model("Person", PersonSchema);

export default PersonModel;
