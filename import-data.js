import fs from "fs";
import path from "path";
import NFT from "./models/nftModel.js";

const dir = path.join(process.cwd(), "nft-data", "data", "nft-simple.json");

const nftData = JSON.parse(fs.readFileSync(dir, "utf-8"));

console.log(nftData);

const InsertData = async (req, res) => {
  try {
    if (nftData) {
      const data = await NFT.create(nftData);
      data.save().catch((err) => {
        throw new Error(err);
      });
      res.status(201).send({
        status: "success",
        message: "NFT created successfully",
        data: data,
      });
    } else {
      throw new Error("The data is required");
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
};

export default InsertData;
