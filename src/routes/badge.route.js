import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import {
  createBadge,
  updateBadge,
  deleteBadge,
  badge,
  badges,
} from "../controllers/badge.controller.js";

const badgeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Badges
 *   description: Badge management (Admin only)
 */

/**
 * @swagger
 * /badges:
 *   get:
 *     summary: Get all badges
 *     tags: [Badges]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of badges
 */
badgeRouter.route("/").get(badges);

/**
 * @swagger
 * /badges:
 *   post:
 *     summary: Create a new badge
 *     tags: [Badges]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, required_points]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Top Performer"
 *               description:
 *                 type: string
 *                 example: "Awarded for completing all tasks with excellence"
 *               required_points:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Badge created successfully
 *       403:
 *         description: Only admin can create badges
 */
badgeRouter.route("/").post(createBadge);

/**
 * @swagger
 * /badges/{badgeId}:
 *   get:
 *     summary: Get badge details
 *     tags: [Badges]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: badgeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Badge fetched successfully
 *       404:
 *         description: Badge not found
 */
badgeRouter.route("/:badgeId").get(badge);

/**
 * @swagger
 * /badges/{badgeId}:
 *   put:
 *     summary: Update a badge
 *     tags: [Badges]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: badgeId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Badge Name"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               required_points:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Badge updated successfully
 *       403:
 *         description: Only admin can update badges
 */
badgeRouter.route("/:badgeId").put(updateBadge);

/**
 * @swagger
 * /badges/{badgeId}:
 *   delete:
 *     summary: Delete a badge
 *     tags: [Badges]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: badgeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Badge deleted successfully
 *       403:
 *         description: Only admin can delete badges
 */
badgeRouter.route("/:badgeId").delete(deleteBadge);

export default badgeRouter;
