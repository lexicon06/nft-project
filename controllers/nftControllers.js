import path from "path";
import fs from "fs";
import NFT from "../models/nftModel.js";

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

    const result = await NFT.findByIdAndDelete(id);

    if (!result) throw new Error("NFT not found");
    else
      res
        .status(200)
        .send({ status: "success", message: "NFT deleted successfully" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
  /*try {
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
  }*/
};

const patchNFT = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await NFT.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!result) throw new Error("NFT not found");
    else
      res.status(200).send({
        status: "success",
        message: "NFT updated successfully",
        data: result,
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

/*const postNFT = async (req, res) => {
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
};*/

const postNFT = async (req, res) => {
  try {
    if (req.body && req.body.name && req.body.rating && req.body.price) {
      const data = await NFT.create(req.body);
      data.save().catch((err) => {
        throw new Error(err);
      });
      res.status(201).send({
        status: "success",
        message: "NFT created successfully",
        data: data,
      });
    } else {
      throw new Error("All fields are required");
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
};

const getAllNFT = async (req, res) => {
  try {
    const data = await NFT.find();
    res.status(200).send({
      status: "success",
      data: data,
    });
  } catch (e) {
    console.error(e);
  }
};

const getNFT = async (req, res) => {
  try {
    const data = await NFT.findById(req.params.id);
    res.status(200).send({
      status: "success",
      data: data,
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const checkId = (req, res, next, value) => {
  if (req.params.id * 1 > nfts.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  console.log(`ID ${value}`);
  next();
};

const checkBody = (req, res, next, value) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

export { deleteNFT, patchNFT, postNFT, getAllNFT, getNFT, checkId, checkBody };
