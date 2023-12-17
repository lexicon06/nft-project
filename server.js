import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const DB = process.env.DB.replace(/<PASSWORD>/gi, process.env.DB_PASSWORD);

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase enter a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
});

const NFT = mongoose.model("NFT", nftSchema);

const testNFT = new NFT({
  name: "Hercules",
  rating: 5.5,
  price: 585,
});

testNFT
  .save()
  .then((docNFT) => {
    console.log(docNFT);
  })
  .catch((err) => {
    console.log(err);
  });

mongoose
  .connect(DB, {
    userCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(`DB connection successful ${con.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });

//console.log(process.env);

app.listen(process.env.PORT, () => {
  console.log("Server running on port http://localhost:3000");
});
