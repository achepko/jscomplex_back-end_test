import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/cars", (req: Request, res: Response) => {
  // res.status(200).json(users);
  console.log("get all cars");
});

const PORT = 5001;

app.listen(PORT, () => {
  mongoose.connect(
    "mongodb+srv://antonche:antonche@jscomplex-back-end-test.agf2szy.mongodb.net/"
  );
  console.log(`Server has started on PORT ${PORT}`);
});
