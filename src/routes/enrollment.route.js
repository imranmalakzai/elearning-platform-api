import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import {
  cancellEnrollment,
  courseStudents,
  enrollToACourse,
} from "../controllers/enrollment.controller.js";

const enrollmentRouter = express.Router({ mergeParams: true });

enrollmentRouter.use(auth);
enrollmentRouter.route("/").post(enrollToACourse);
enrollmentRouter.route("/:courseId").delete(cancellEnrollment);
enrollmentRouter
  .route("/:courseId")
  .get(allowRoles("instructor"), courseStudents);

export default enrollmentRouter;
