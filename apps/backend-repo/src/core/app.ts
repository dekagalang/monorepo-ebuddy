import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoutes from "../routes/userRoutes";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
