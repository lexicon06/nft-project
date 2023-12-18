import express from "express";
import * as userControllers from "../controllers/userControllers.js";
import * as userData from "../nft-data/data/import-user-data.js";

const router = express.Router();

router.route("/importusers").post(userData.importUsersData);
router.route("/deleteUsers").delete(userData.deleteUsersData);

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
router
  .route("/:id")
  .get(userControllers.getSingleUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
