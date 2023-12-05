import pool from "../config/db.js";
import { haversine } from "../utils/index.js";

export const getNearAmbulan = async (req, res) => {
  //get query parameters if not any give default param
  const { lat, lon, radius = 10000 } = req.query;

  //if lat or lon not given return error
  if (!lat || !lon) {
    return res.status(400).json({
      message: "latitude or longitude not provided, please provide both",
    });
  }

  //validate lat and lon is valid number
  if (isNaN(lat) || isNaN(lon) || isNaN(radius) || radius < 0) {
    return res.status(400).json({
      message: "latitude or longitude or radius is not valid number",
    });
  }

  //validate lat and lon is valid latitude and longitude
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({
      message: "latitude or longitude is not valid latitude or longitude",
    });
  }

  try {
    const [rows, fields] = await pool.query(
      "SELECT nama, telepon, wa, free, available, latitude, longitude FROM ambulans"
    );

    rows.forEach((ambulan) => {
      const distance = haversine(
        ambulan.latitude,
        ambulan.longitude,
        parseFloat(lat),
        parseFloat(lon)
      );
      ambulan.distance = distance;
    });

    const filteredAmbulan = rows.filter(
      (ambulan) => ambulan.distance <= radius
    );

    const orderedAmbulan = filteredAmbulan.sort(
      (a, b) => a.distance - b.distance
    );

    if (orderedAmbulan.length === 0) {
      return res.status(400).json({
        message: "Tolong perbesar radius pencarian",
      });
    }

    return res.status(200).json({
      message: "success",
      data: orderedAmbulan,
    });
  } catch (error) {}
};
