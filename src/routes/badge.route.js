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

//**Admin only endpoints */
badgeRouter.use(auth, allowRoles("admin"));

badgeRouter.route("/").post(createBadge);
badgeRouter.route("/").get(badges);
badgeRouter.route("/:badgeId").get(badge);
badgeRouter.route("/:badgeId").put(updateBadge);
badgeRouter.route("/:badgeId").delete(deleteBadge);

export default badgeRouter;
