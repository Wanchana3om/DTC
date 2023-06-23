import { Router } from "express";
import { pool } from "../utils/db.js";

const getPoints = Router()

getPoints.get("/", async (req, res) => {
    try {
      const data = await pool.query("select * from points")
      return res.json(data.rows);
    } catch (error) {
      console.error("Error during get points:", error);
      res.status(500).send("Server error");
    }
  });

  export default getPoints ;