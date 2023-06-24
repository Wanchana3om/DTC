import cors from "cors";
import express from "express";
import createAccout from "./api/createAccout.js";
import login from "./api/login.js";
import dotenv from "dotenv";
import getPoints from "./api/getPoints.js";
import { protect } from "./middleware/protect.js";

async function init() {
  dotenv.config();
  const app = express();
  const port = 9875;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", createAccout);
  app.use("/login", login);
  app.use("/points", protect, getPoints);
  

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
}
init();