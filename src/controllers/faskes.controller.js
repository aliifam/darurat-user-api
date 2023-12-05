import pool from "../config/db.js";
import { haversine } from "../utils/index.js";

export const getNearFaskes = async (req, res) => {
  //get query parameters if not any give default param 10km
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

  //get all faskes from database
  try {
    //select specific columns from faskes table
    const [rows, fields] = await pool.query(
      "SELECT nama, alamat, telepon, wa, email, jenis, website, bpjs, available, latitude, longitude FROM faskes"
    );

    //calculate distance from user to faskes
    rows.forEach((faskes) => {
      const distance = haversine(
        faskes.latitude,
        faskes.longitude,
        parseFloat(lat),
        parseFloat(lon)
      );
      faskes.distance = distance;
    });

    //filter the faskes by radius
    const filteredFaskes = rows.filter((faskes) => faskes.distance <= radius);

    // console.log(filteredFaskes.length);

    //order the faskes by distance from the nearest to the farthest
    const orderedFaskes = filteredFaskes.sort(
      (a, b) => a.distance - b.distance
    );

    //if there is no faskes in the radius return please increase the radius
    if (orderedFaskes.length === 0) {
      return res.status(400).json({
        message: "Tolong perbesar radius pencarian",
      });
    }

    // filter the faskes by radius
    return res.status(200).json({
      message: "success",
      data: orderedFaskes,
    });
    // order the faskes by distance from the user
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
