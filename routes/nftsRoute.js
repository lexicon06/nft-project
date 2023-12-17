import express from "express";
import * as nftControllers from "../controllers/nftControllers.js";
import * as fileData from "../nft-data/data/import-data.js";

const router = express.Router();

router.param("id", nftControllers.checkId);

router
  .route("/:id")
  .delete(nftControllers.deleteNFT)
  .patch(nftControllers.patchNFT)
  .get(nftControllers.getNFT);
router
  .route("/")
  .get(nftControllers.getAllNFT)
  .post(nftControllers.checkBody, nftControllers.postNFT);

router.route("/import").post(nftControllers.checkData, fileData.importData);

router.route("/deleteAll").delete(fileData.deleteData);

export default router;
