import { AdminToken } from "./setup.js";
import app from "../app.js";

import request from "supertest";

//**Auth route endpoints loign/register */
describe("AUTH API", () => {
  test("Login returns JWT token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "admin@123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
  test("Register user with invalid email address should return statusCode of 400", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "haji",
      email: "kfjkasdjfalksd",
      password: "super_secret_key",
    });
    expect(res.statusCode).toBe(400);
  });
});

//**Admin only route endpoints automated testing */
describe("Users API", () => {
  let token;
  beforeAll(async () => (token = await AdminToken()));

  //test get user without admin token
  test("Get users without admin token retun statusCode 401", async () => {
    const res = await request(app).get("/api/admin/users");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  //get user with admin token
  test("Get users with admin token retun status code 200", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set(`Authorization`, ` Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
