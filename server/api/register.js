import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../utils/db.js";

const register = Router()

register.post("/", async (req, res) => {
    const { username,name, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    
    await pool.query(
        `INSERT INTO users (username, password,name) VALUES ($1, $2, $3)`,
        [username, hashPassword,name]
    );
    res.send("Your account has been created");
  });

  export default register ;

   
