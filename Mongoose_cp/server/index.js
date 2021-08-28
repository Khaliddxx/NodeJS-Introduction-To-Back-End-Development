import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import personRouter from "./Routes/person.js";
import env from "dotenv";
env.config();

// First Requirement: Create a person schema
import PersonModel from "./Schemas/person.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Mongo Connected")
);

app.use("/", (req, res) => {
  res.send("YES");
});

//_____________________________________________________________________________//

// Second Requirement: Create and Save a Record of a Model
const Create_Save_Record = async () => {
  const person1 = new PersonModel({
    id: 1,
    name: "Ahmed",
    age: 18,
    favFoods: ["apple", "avocado", "batates"],
  });
  await person1.save();

  const person2 = new PersonModel({
    id: 2,
    name: "Khalid",
    age: 24,
    favFoods: ["картофельное пюре"],
  });
  await person2.save();
};

Create_Save_Record().catch(() => console.error());

//_____________________________________________________________________________//

// Third Requirement: Create Many Records with model.create()
PersonModel.create([
  { id: 3, name: "Ibrahim", age: 22, favFoods: ["betengan"] },
  { id: 4, name: "Davis", age: 19, favFoods: ["waterMelooon", "avocato"] },
]).catch(() => {
  console.error();
});

//_____________________________________________________________________________//

// Fourth Requirement: Use model.find() to Search Your Database
(async () => {
  const data = await PersonModel.find();
  console.log(data);
})();

//_____________________________________________________________________________//

// Fifth Requirement: Use model.findOne() to Return a Single Matching Document from Your Database
(async () => {
  const data = await PersonModel.findOne({ name: "Khalid" });
  console.log("\n\n Fifth Requirement: Use model.findOne() \n");
  console.log(data);
})();

//_____________________________________________________________________________//

// Sixth Requirement: Use model.findById() to Search Your Database By _id
(async () => {
  const data = await PersonModel.findById("612a4b5d5602d33dac849319");
  console.log("\n\n Sixth Requirement: Use model.findById() \n");
  console.log(data);
})();

//_____________________________________________________________________________//

// Seventh Requirement: Perform Classic Updates by Running Find, Edit, then Save
// (async () => {
//   const person = await PersonModel.findById("612a4b5d5602d33dac849319");
//   person.favFoods.push("ahmed");
//   const data = await PersonModel.findByIdAndUpdate(
//     "612a4b5d5602d33dac849319",
//     {
//       favFoods: person.favFoods,
//     },
//     { new: true }
//   );
//   console.log("\n\n Seventh Requirement: Perform Classic Updates \n");
//   console.log(data);
// })();

//_____________________________________________________________________________//

// Eighth Requirement: Perform New Updates on a Document Using model.findOneAndUpdate()
(async () => {
  const data = await PersonModel.findOneAndUpdate(
    { name: "Davis" },
    { name: "David" }
  );
  console.log("\n\n Eighth Requirement: Use model.findOneAndUpdate() \n");
  // console.log(data);
})();

// Ninth Requirement: Delete One Document Using model.findByIdAndRemove
(async () => {
  const data = await PersonModel.deleteOne({ name: "Mohamed" });
  console.log("\n\n Ninth Requirement: Use model.deleteOne() \n");
  // console.log(data);
})();

// 10th Requirement: MongoDB and Mongoose - Delete Many Documents with model.remove()
(async () => {
  const data = await PersonModel.remove({ id: { $lt: 2 } });
  console.log("\n\n 10th Requirement: Use model.remove() \n");
  // console.log(data);
})();

// 11th Requirement: Chain Search Query Helpers to Narrow Search Results
//.find(), .sort(), .limit(), .select(), and then .exec()
(async () => {
  const done = (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("\n\n 11th Requirement: Chaining .find.sort.limit.select \n");
      console.log(data);
    }
  };
  const data = PersonModel.find({ favFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("id name favFoods")
    .exec(done);
})();

app.listen(PORT, () => console.log("server running successfully"));
