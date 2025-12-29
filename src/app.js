import express from "express";
import cors from "cors";

//** import routers*/
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import badgeRouter from "./routes/badge.route.js";

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

//**health end point */
app.get("/", (req, res) => {
  res.json({ message: "Api is working fine" });
});

//**custom middlewares */
app.use(errorHandlerMiddleWare);

export default app;
