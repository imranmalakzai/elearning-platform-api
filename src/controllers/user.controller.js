import ApiError from "../utils/api_error.js";
import asyncHandler from "../utils/async_handler.js";
import bcrypt from "bcrypt";
import { Roles } from "../utils/role.js";
import {
  createUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUserProfile,
  changePassword,
  getAllStudents,
  changeRole,
  getAllUsers,
  getUserById,
} from "../repository/users.repository.js";
import { generateToken } from "../utils/jwt.js";

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

//**GET LoggedIn USER PROFILE */
export const userProfile = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user.id);
  res.status(200).json({ user });
});

//**Update user profile */
export const updateProfile = asyncHandler(async (req, res) => {
  //name and email only
  const user = await updateUserProfile({ ...req.body }, req.user.id);
  if (!user) throw new ApiError("unable to update the user profile");
  res.status(200).json({ message: "profile updated successfully" });
});

//**Delete Account profile */
export const deleteAccount = asyncHandler(async (req, res) => {
  const user = await deleteUser(req.user.id);
  req.user.remove();
  if (!user) throw new ApiError("unable to delete account", 400);
  res.status(200).json({ message: "Account deleted successsfully" });
});

//** Change password */
export const changePasswordController = asyncHandler(async (req, res) => {
  const { oldPassword, newpassword } = req.body;
  if (!oldPassword || !newpassword)
    throw new ApiError("old passowrd and new passward is required", 409);

  const user = await getUserById(req.user.id);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new ApiError("Invalid old password", 409);

  const passward = await bcrypt.hash(newpassword, 10);
  const update = await changePassword(user.id, passward);
  if (!update) throw new ApiError("unable to update password");

  res.status(200).json({ message: "password updated successfully" });
});

//**Change user role controller (Admin only) */
export const changeRoleController = asyncHandler(async (req, res) => {
  const role = req.body.role;
  if (!Roles.includes(role)) throw new ApiError("Invalid Role", 400);
  const user = await getUserById(req.params.id);
  if (!user) throw new ApiError("Invalid user id", 400);
  const update = await changeRole(user.id, role);
  if (!update) throw new ApiError("unable to update role", 500);
  res.status(204).json({ message: "user role update successfully" });
});

//**Get all students (admin only) */
export const studentsController = asyncHandler(async (req, res) => {
  const users = await getAllStudents();
  res.status(200).json({ users });
});

//**Get all users **/
export const users = asyncHandler(async (req, res) => {
  const result = await getAllUsers();
  res.status(200).json({ users: result || [] });
});

//**Get a user by Id */
export const userById = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user.id);
  res.status(200).json({ user: user || {} });
});
