import fs from "fs";
import userNFT from "../../models/userNftModel.js";
import path from "path";

const fdir = path.join("nft-data", "data", "nft-users.json");
const nfts = JSON.parse(fs.readFileSync(fdir, "utf-8"));

//IMPORT DATA
const importUsersData = async (req, res) => {
  try {
    await userNFT.create(nfts);
    res.status(201).json({
      status: "success",
      message: "USER DATA successfully imported",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

//DELETE DATA
const deleteUsersData = async (req, res) => {
  try {
    await userNFT.deleteMany();
    console.log("USER DATA successfully Deleted");
    res.status(201).json({
      status: "success",
      message: "USER DATA successfully Deleted",
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

export { importUsersData, deleteUsersData };
