import express from "express";
import {
  getAllNFT,
  getNFT,
  postNFT,
  patchNFT,
  deleteNFT,
} from "../controllers/nftControllers.js";

const router = express.Router();

router.route("/:id").delete(deleteNFT).patch(patchNFT).get(getNFT);
router.route("/").get(getAllNFT).post(postNFT);

export default router;
