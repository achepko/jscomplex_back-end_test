import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { ICredentials } from "../types/token.type";
import { PaymentValidator } from "../validators/payment.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isUserAlreadyExist<ICredentials>("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login
);
router.get(
  "/profile",
  authMiddleware.checkAccessToken,
  authController.getUserProfile
);
router.put(
  "/profile/account-type/upgrade",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(PaymentValidator.buyPremium),
  authController.buyPremiumAccount
);

export const authRouter = router;
