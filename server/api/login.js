import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";
const login = Router()

login.post("/", async (req, res) => {
    const { username, password } = req.body;
    
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const storedUsername = user.rows[0].username
    const storedPassword = user.rows[0].password

    if (!storedUsername) {
        res.status(401).send("Invalid username");
        return;
      }

    const isValidPassword = await bcrypt.compare(password, storedPassword);

    if (!isValidPassword) {
        res.status(401).send("Invalid password");
        return;
      }

      const token = jwt.sign(
        {
          id: user.rows[0]._id,
          username: user.rows[0].username,

        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.json({ token });
  });

  export default login ;
