import mysql from "mysql2/promise";
import { HOST, DB_NAME, DB_USER, DB_PASSWORD } from "./env.config.js";

const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10, // max simultaneous connections
  queueLimit: 0, // unlimited waiting queries
});

export default pool;
