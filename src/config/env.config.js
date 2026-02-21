import dotenv from "dotenv";
dotenv.config({ path: `.env` });

export const {
  PORT,
  REDIS_CLIENT_URL,
  HOST,
  DB_NAME,
  DB_USER,
  JWT_SECRET,
  DB_PASSWORD,
} = process.env;
