import express from "express";
import cors from "cors";

//** import routers*/
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import badgeRouter from "./routes/badge.route.js";
import leaderboardRouter from "./routes/leaderboard.route.js";

//**Swagger setup */
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config.js";

//error middleware
import errorHandlerMiddleWare from "./middlewares/error_handler.middleware.js";

const app = express();

//**usefull middlewares */
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.urlencoded({ extended: true }));

//**Route end points */
app.use("/api/", userRouter);
app.use("/api/courses/", courseRouter);
app.use("/api/badges/", badgeRouter);
app.use("/api/leaderboards/", leaderboardRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//  Swagger JSON
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

//**health end point */
app.get("/", (req, res) => {
  res.json({ message: "Api is working fine" });
});

//**custom middlewares */
app.use(errorHandlerMiddleWare);

export default app;
