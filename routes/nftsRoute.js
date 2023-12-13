import express from "express";
import * as nftControllers from "../controllers/nftControllers.js";

const router = express.Router();

router
  .route("/:id")
  .delete(nftControllers.deleteNFT)
  .patch(nftControllers.patchNFT)
  .get(nftControllers.getNFT);
router.route("/").get(nftControllers.getAllNFT).post(nftControllers.postNFT);

export default router;
