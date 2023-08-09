import { Router } from "express";

import { adController } from "../controllers/ad.controller";

const router = Router();

router.get("/", adController.findAll);
router.get("/:adId", adController.findById);

// router.get("/ad/:id/views-statistics",adController.showViewsStatistics)
// router.get("/ad/:id/views-statistics/:month/:week/:day",adController.showViewsStatistics)
// router.get("/ad/:region/average-price",adController.findAveragePriceByRegion)
// router.get("/ad/ukraine/average-price",adController.findAveragePriceByRegion)

router.post("/", adController.create);
router.put("/:adId", adController.updateById);
router.delete("/:adId", adController.deleteById);

export const adRouter = router;
