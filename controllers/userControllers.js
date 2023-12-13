import path from "path";
import fs from "fs";

const currentDirectory = process.cwd();

const uFolder = path.join(
  currentDirectory,
  "nft-data",
  "data",
  "nft-users.json"
);

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

export { getAllUsers, getSingleUser, createUser, deleteUser, updateUser };
