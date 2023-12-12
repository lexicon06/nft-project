import express from "express";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json()); //this is a middleware function from express instead using .json when sending data

const currentDirectory = process.cwd();

const folder = path.join(
  currentDirectory,
  "nft-data",
  "data",
  "nft-simple.json"
);

const nfts = JSON.parse(fs.readFileSync(folder, "utf-8"));

//console.log(nft.length);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.post("/api/v1/nft", async (req, res) => {
  try {
    console.log(req.body);
    const newId = nfts[nfts.length - 1].id + 1;
    const newNft = Object.assign({ id: newId }, req.body);
    nfts.push(newNft);
    await fs.promises.writeFile(folder, JSON.stringify(nfts));
    return res.status(201).send({
      status: "success",
      message: "NFT created successfully",
      data: newNft,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.get("/api/v1/nft", (req, res) => {
  res.status(200).send({
    status: "success",
    results: nfts.length,
    data: nfts,
  });
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
