import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import { validate } from "../middlewares/validate.mddleware.js";
import {
  changePasswordSchema,
  loginShema,
  registerSchema,
} from "../validation/users.schema.js";

// controllers
import {
  register,
  login,
  userProfile,
  updateProfile,
  deleteAccount,
  changePasswordController,
  userById,
  changeRoleController,
  getUserByRoles,
} from "../controllers/user.controller.js";

import { getInstructorCourses } from "../controllers/course.controller.js";

const userRouter = express.Router();

/* ================= AUTH ================= */
userRouter.post("/auth/register", validate(registerSchema), register);
userRouter.post("/auth/login", validate(loginShema), login);

/* ================= USER (SELF) ================= */
userRouter.get("/users/me", auth, userProfile);
userRouter.put("/users/me", auth, updateProfile);
userRouter.delete("/users/me", auth, deleteAccount);
userRouter.patch(
  "/users/me/password",
  auth,
  validate(changePasswordSchema),
  changePasswordController
);

/* ================= INSTRUCTORS ================= */
userRouter.get("/instructors/:instructorId/courses", getInstructorCourses);

/* ================= ADMIN ================= */
userRouter.use("/admin", auth, allowRoles("admin"));

userRouter.get("/admin/users", getUserByRoles); // supports ?role=
userRouter.get("/admin/users/:id", userById);
userRouter.patch("/admin/users/:id/role", changeRoleController);

export default userRouter;
