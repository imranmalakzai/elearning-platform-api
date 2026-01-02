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

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Course enrollment management
 */

/**
 * @swagger
 * /api/courses/{courseId}/enroll:
 *   post:
 *     summary: Enroll authenticated user into a course
 *     tags: [Enrollments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully enrolled in course
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 */
enrollmentRouter.route("/").post(enrollToACourse);

/**
 * @swagger
 * /api/courses/{courseId}/enroll:
 *   delete:
 *     summary: Cancel enrollment from a course
 *     tags: [Enrollments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Enrollment cancelled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Enrollment not found
 */
enrollmentRouter.route("/").delete(cancellEnrollment);

/**
 * @swagger
 * /api/courses/{courseId}/enroll:
 *   get:
 *     summary: Get all students enrolled in a course
 *     tags: [Enrollments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of enrolled students
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only instructors can access this resource
 */
enrollmentRouter.route("/").get(allowRoles("instructor"), courseStudents);

export default enrollmentRouter;
