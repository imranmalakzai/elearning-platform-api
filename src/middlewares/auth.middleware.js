import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import ApiError from "../utils/api_error.js";

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {
    throw new ApiError("please authenticate", 401);
  }
  const token = header.split(" ")[1];
  const decode = jwt.verify(token, JWT_SECRET);
  if (!decode) throw new ApiError("Invalid token", 401);
  req.token = token;
  req.user = decode;
  next();
};
