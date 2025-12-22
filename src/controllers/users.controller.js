import ApiError from "../utils/api_error.js";
import asyncHandler from "../utils/async_handler.js";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../repository/users.repository.js";
import { generateToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

//**Register new user */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new ApiError("All Fields are required", 409);
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password: hashPassword,
  });
  if (!user) throw new ApiError("unable to create register user", 400);
  res.status(201).json({ message: "registeration successed" });
});

//**Login existing user */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError("email and password is required", 409);
  }
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError("invalid email or password", 401);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError("invalid email or password", 401);
  }
  const token = await generateToken(user);
  res.status(200).json({ token, user });
});
