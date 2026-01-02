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
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Imran
 *               email:
 *                 type: string
 *                 example: imran@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
userRouter.post("/auth/register", validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: imran@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
userRouter.post("/auth/login", validate(loginShema), login);

/* ================= USER (SELF) ================= */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile operations
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched
 *       401:
 *         description: Unauthorized
 */
userRouter.get("/users/me", auth, userProfile);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
userRouter.put("/users/me", auth, updateProfile);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete logged-in user account
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted
 */
userRouter.delete("/users/me", auth, deleteAccount);

/**
 * @swagger
 * /users/me/password:
 *   patch:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
userRouter.patch(
  "/users/me/password",
  auth,
  validate(changePasswordSchema),
  changePasswordController
);

/* ================= INSTRUCTORS ================= */
/**
 * @swagger
 * tags:
 *   name: Instructors
 *   description: Instructor related APIs
 */

/**
 * @swagger
 * /instructors/{instructorId}/courses:
 *   get:
 *     summary: Get courses by instructor
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instructor courses list
 */
userRouter.get(
  "/instructors/:instructorId/courses",
  auth,
  allowRoles("instructor"),
  getInstructorCourses
);

/* ================= ADMIN ================= */
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only APIs
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get users by role
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           example: instructor
 *     responses:
 *       200:
 *         description: Users fetched
 */
userRouter.get("/admin/users", auth, allowRoles("admin"), getUserByRoles);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 */
userRouter.get("/admin/users/:id", auth, allowRoles("admin"), userById);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   patch:
 *     summary: Change user role
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 example: instructor
 *     responses:
 *       200:
 *         description: Role updated
 */
userRouter.patch(
  "/admin/users/:id/role",
  auth,
  allowRoles("admin"),
  changeRoleController
);

export default userRouter;
