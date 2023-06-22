import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../utils/db.js";

const createAccout = Router()

createAccout.post("/", async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    
    await pool.query(
        `INSERT INTO users (username, password) VALUES ($1, $2)`,
        [username, hashPassword]
    );
    res.send("Your account has been created");
  });

  export default createAccout ;

   
