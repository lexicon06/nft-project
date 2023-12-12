import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();
const currentDirectory = process.cwd();

const uFolder = path.join(
  currentDirectory,
  "nft-data",
  "data",
  "nft-users.json"
);

//USERS

const getAllUsers = async (req, res) => {
  try {
    const users = JSON.parse(await fs.promises.readFile(uFolder, "utf-8"));
    res.status(200).send({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (e) {
    res.send(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const getSingleUser = (res, req) => {
  res.status(500).send({
    status: "error",
    message: "This route is not yet defined",
  });
};

const createUser = (res, req) => {
  res.status(500).send({
    status: "error",
    message: "This route is not yet defined",
  });
};

const deleteUser = (res, req) => {
  res.status(500).send({
    status: "error",
    message: "This route is not yet defined",
  });
};

const updateUser = (res, req) => {
  res.status(500).send({
    status: "error",
    message: "This route is not yet defined",
  });
};

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

export default router;
