import fs from "fs";
import path from "path";
import NFT from "./models/nftModel.js";

const dir = path.join(process.cwd(), "nft-data", "data", "nft-simple.json");

const nftData = JSON.parse(fs.readFileSync(dir, "utf-8"));

console.log(nftData);

const InsertData = async () => {
  try {
    if (nftData) {
      const data = await NFT.create(nftData);
      data.save().catch((err) => {
        throw new Error(err);
      });
      console.log("Data successfully imported");
    } else {
      throw new Error("The data is required");
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteData = async () => {
  try {
    await NFT.deleteMany();
    console.log("Deleted all data");
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === "--import") {
  InsertData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
