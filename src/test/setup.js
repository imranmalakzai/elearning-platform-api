import request from "supertest";
import app from "../app.js";

export const AdminToken = async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@gmail.com", password: "admin@123" });
  return res.body.token;
};
