import express from "express";
import path from "path";
import fs from "fs";
import morgan from "morgan";

const app = express();
app.use(express.json()); //this is a middleware function from express instead using .json when sending data
app.use(morgan("dev"));

const currentDirectory = process.cwd();

const folder = path.join(
  currentDirectory,
  "nft-data",
  "data",
  "nft-simple.json"
);

const nfts = JSON.parse(fs.readFileSync(folder, "utf-8"));

const deleteNFT = async (req, res) => {
  try {
    const id = req.params.id;
    const nftIndex = nfts.find((nft) => nft.id == id);
    if (nftIndex === -1) {
      return res.status(404).send({
        status: "error",
        message: "NFT not found",
      });
    }

    nfts.splice(nftIndex, 1);
    await fs.promises.writeFile(folder, JSON.stringify(nfts));

    return res.status(200).send({
      status: "success",
      message: "NFT deleted successfully",
    });
  } catch (e) {
    console.error(e);
    if (e instanceof ClientError) {
      return res.status(400).send({
        status: "error",
        message: e.message,
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  }
};

const patchNFT = async (req, res) => {
  try {
    const id = req.params.id;
    const nft = nfts.find((nft) => nft.id == id);
    if (!nft) {
      return res.status(404).send({
        status: "error",
        message: "NFT not found",
      });
    }

    const newNft = Object.assign(nft, req.body);
    await fs.promises.writeFile(folder, JSON.stringify(nfts));

    return res.status(200).send({
      status: "success",
      message: "NFT updated successfully",
      data: newNft,
    });
  } catch (e) {
    console.error(e);
    if (e instanceof ClientError) {
      return res.status(400).send({
        status: "error",
        message: e.message,
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  }
};

const postNFT = async (req, res) => {
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
};

const getAllNFT = (req, res) => {
  res.status(200).send({
    status: "success",
    results: nfts.length,
    data: nfts,
  });
};

const getNFT = (req, res) => {
  const nft = nfts.find((n) => n.id === parseInt(req.params.id));
  if (!nft) {
    return res.status(404).send({
      status: "error",
      message: "NFT not found",
    });
  }
  return res.status(200).send({
    status: "success",
    data: nft,
  });
};

/*

app.delete("/api/v1/nft/:id", deleteNFT);

app.patch("/api/v1/nft/:id", patchNFT);

app.get("/api/v1/nft/:id", getNFT);

app.post("/api/v1/nft", postNFT);

app.get("/api/v1/nft", getAllNFT);

*/

app.route("/api/v1/nft/:id").delete(deleteNFT).patch(patchNFT).get(getNFT);
app.route("/api/v1/nft").get(getAllNFT).post(postNFT);

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
