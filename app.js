import express from "express";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());

const currentDirectory = process.cwd();

const folder = path.join(
  currentDirectory,
  "nft-data",
  "data",
  "nft-simple.json"
);

const nft = JSON.parse(fs.readFileSync(folder, "utf-8"));

//console.log(nft.length);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.get("/api/v1/nft", (req, res) => {
  res.status(200).send({
    status: "success",
    results: nft.length,
    data: nft,
  });
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
