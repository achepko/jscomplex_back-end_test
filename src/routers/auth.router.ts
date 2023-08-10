import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userMiddleware } from "../middlewares/user.middleware";
import { ICredentials } from "../types/token.type";

const router = Router();

router.post("/register", authController.register);
router.post(
  "/login",
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login
);

export const authRouter = router;
