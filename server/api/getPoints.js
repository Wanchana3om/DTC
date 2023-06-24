import { Router } from "express";
import { pool } from "../utils/db.js";

const getPoints = Router();

getPoints.get("/", async (req, res) => {
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);
  const sort_column = req.query.sort_column;
  const sort_direction = req.query.sort_direction;
  const search = req.query.search;
  const start_idx = (page - 1) * per_page;

  try {
    let params = [];
    let querys = "select * from points";

    if (search) {
      querys += " where lm_tname like $1";
      params.push(`%${search}%`);
    }
    if (sort_column) {
      querys += ` order by ${sort_column} ${sort_direction}`;
    }

    if (!search) {
      querys += " offset $1 limit $2";
      params.push(start_idx);
      params.push(per_page);
    } else {
      querys += " offset $2 limit $3";
      params.push(start_idx);
      params.push(per_page);
    }

    const data = await pool.query(querys, params);

    const total = await pool.query("select count (_id) from points");

    const totalPages = Math.ceil(total.rows[0].count / per_page);
  
    return res.json({
      data: data.rows,
      page,
      per_page,
      totalPages,
      total: parseInt(total.rows[0].count),
    });
  } catch (error) {
    console.error("Error during get points:", error);
    res.status(500).send("Server error");
  }
});

export default getPoints;
