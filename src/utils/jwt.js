import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";

export const generateToken = async (user) => {
  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};
