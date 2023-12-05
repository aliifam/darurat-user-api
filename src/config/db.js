import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "nama_database",
  waitForConnections: true, // agar tidak ada error
  connectionLimit: 20, // agar database tidak overload
  queueLimit: 0, // agar tidak ada batasan jumlah permintaan yang dapat masuk ke antrian
};

const pool = mysql.createPool(dbConfig);

export default pool;
