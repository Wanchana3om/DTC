import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";

const login = Router();

login.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (user.rows.length === 0) {
      res.status(401).send("Invalid username");
      return;
    }

    const storedUsername = user.rows[0].username;
    const storedPassword = user.rows[0].password;

    const isValidPassword = await bcrypt.compare(password, storedPassword);

    if (!isValidPassword) {
      res.status(401).send("Invalid password");
      return;
    }

    const token = jwt.sign(
      {
        id: user.rows[0]._id,
        username: storedUsername,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default login;
