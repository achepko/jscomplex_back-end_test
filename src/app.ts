import express from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { adRouter } from "./routers/ad.router";
import { authRouter } from "./routers/auth.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ads", adRouter);
app.use("/auth", authRouter);

const PORT = 5001;

app.listen(PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
