import dotenv from "dotenv";
dotenv.config({ path: `.env.${"development" || "production"}` });

export const { PORT, HOST, DB_NAME, DB_USER, JWT_SECRET, DB_PASSWORD } =
  process.env;
