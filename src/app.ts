import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
import {configs} from "./configs/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/cars", (req: Request, res: Response) => {
  // res.status(200).json(users);
  console.log("get all cars");
});

const PORT = 5001;

app.listen(PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
