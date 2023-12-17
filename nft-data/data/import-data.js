import fs from "fs";
import NFT from "../../models/nftModel.js";
import path from "path";

const fdir = path.join("nft-data", "data", "nft-simple.json");
const nfts = JSON.parse(fs.readFileSync(fdir, "utf-8"));

//IMPORT DATA
const importData = async (req, res) => {
  try {
    await NFT.create(nfts);
    res.status(201).json({
      status: "success",
      message: "DATA successfully imported",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//DELETE DATA
const deleteData = async (req, res) => {
  try {
    await NFT.deleteMany();
    console.log("DATA successfully Deleted");
    res.status(201).json({
      status: "success",
      message: "DATA successfully Deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

/* if (process.argv[2] === "--import") {
  importDate();
} else if (process.argv[2] === "--delete") {
  deleteData();
} */

export { importData, deleteData };
