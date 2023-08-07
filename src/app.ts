import express, { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req: Request, res: Response) => {
  // res.status(200).json(users);
  console.log("get all users");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
