import { Router } from "express";

import { adController } from "../controllers/ad.controllers";

const router = Router();

router.get("/", adController.findAll);

export const adRouter = router;
