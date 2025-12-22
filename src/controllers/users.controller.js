import ApiError from "../utils/api_error.js";
import asyncHandler from "../utils/async_handler.js";
import bcrypt from "bcrypt";
import { createUser } from "../repository/users.repository.js";

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
});
