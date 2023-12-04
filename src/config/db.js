// src/config/db.js
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "nama_database",
};

const pool = mysql.createPool(dbConfig);

export default pool;
