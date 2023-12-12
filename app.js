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

app.post("/api/v1/nft", (req, res) => {
  try {
    console.log(req);
    const newId = nfts[nfts.length - 1].id + 1;
    const newNft = Object.assign({ id: newId }, req.body);
    nfts.push(newNft);
    fs.writeFile(folder, JSON.stringify(nfts), (err) => {
      if (err) {
        console.log(err);
        /*
        demo
  
        {
          "name": "Mona Lisa",
          "description": "The Mona Lisa is a 16th century oil painting created by Leonardo da Vinci.",
          "imageCover": "mona-lisa.jpg"
        }
        */
        throw new Error("Something went wrong: " + err);
      }
    });
    return res.send({
      status: "success",
      message: "NFT created successfully",
      data: newNft,
    });
  } catch (e) {
    return res.send({
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
