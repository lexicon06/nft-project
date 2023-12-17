import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const DB = process.env.DB.replace(/<PASSWORD>/gi, process.env.DB_PASSWORD);

/*
const testNFT = new NFT({
  name: "Alien",
  rating: 2.2,
  price: 23,
});

testNFT
  .save()
  .then((docNFT) => {
    console.log(docNFT);
  })
  .catch((err) => {
    console.log(err);
  });
*/

mongoose
  .connect(DB, {
    userCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(`DB connection successful ${con.connection.host}`);

    app.listen(process.env.PORT, () => {
      console.log("Server running on port http://localhost:3000");
    }); //we only open our server if mongodb is connected successfully
  })
  .catch((err) => {
    console.log(err);
  });

//console.log(process.env);
