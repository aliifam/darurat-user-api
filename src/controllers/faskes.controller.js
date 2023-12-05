import pool from "../config/db.js";

export const getAllFaskes = async (req, res) => {
  //get query parameters if not any give default param
  const { lat, lon, radius = 5000 } = req.query;

  //if lat or lon not given return error
  if (!lat || !lon) {
    return res.status(400).json({
      message: "lat or lon not provided",
    });
  }

  //get all faskes from database
  try {
    const [rows, fields] = await pool.query("SELECT * FROM faskes");

    // filter the faskes by radius
    return res.status(200).json({
      message: "success",
      data: rows,
    });
    // order the faskes by distance from the user
  } catch (error) {
    console.log(error);
  }
};
