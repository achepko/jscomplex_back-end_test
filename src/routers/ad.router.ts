import { Router } from "express";

import { adController } from "../controllers/ad.controllers";

const router = Router();

router.get("/", adController.findAll);

router.get("/:adId", adController.findById);
router.post("/", adController.create);
router.put("/:adId", adController.updateById);
router.delete("/:adId", adController.deleteById);

export const adRouter = router;
