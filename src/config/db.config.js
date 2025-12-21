import mysql from "mysql2";
import { HOST, DB_NAME, DB_USER, DB_PASSWORD } from "./env.config.js";

const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
