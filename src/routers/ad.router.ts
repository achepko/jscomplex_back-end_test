import { Router } from "express";

import { adController } from "../controllers/ad.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AdValidator } from "../validators/ad.validator";

const router = Router();

router.get("/", adController.findAll);
router.get("/:adId", commonMiddleware.isIdValid("adId"), adController.findById);

// router.get("/ad/:id/views-statistics",adController.showViewsStatistics)
// router.get("/ad/:id/views-statistics/:month/:week/:day",adController.showViewsStatistics)
// router.get("/ad/:region/average-price",adController.findAveragePriceByRegion)
// router.get("/ad/ukraine/average-price",adController.findAveragePriceByRegion)

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(AdValidator.create),
  adController.create
);
router.put(
  "/:adId",
  authMiddleware.checkAccessToken,
  authMiddleware.checkAuthorId,
  commonMiddleware.isIdValid("adId"),
  commonMiddleware.isBodyValid(AdValidator.update),
  adController.updateById
);
router.delete(
  "/:adId",
  authMiddleware.checkAccessToken,
  authMiddleware.checkAuthorId,
  commonMiddleware.isIdValid("adId"),
  adController.deleteById
);

export const adRouter = router;
