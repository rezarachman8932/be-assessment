import request from "supertest";
import app from "../index";
import prisma from "../db/prisma";

describe("User API", () => {
  afterAll(async () => {
    await prisma.user.deleteMany(); // bersihkan DB setelah test
    await prisma.$disconnect();
  });

  it("should create a new user", async () => {
    const res = await request(app).post("/user").send({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      birthday: "1990-01-01",
      timezone: "Asia/Jakarta",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("test@example.com");
  });

  it("should reject duplicate email", async () => {
    const res = await request(app).post("/user").send({
      firstName: "Duplicate",
      lastName: "User",
      email: "test@example.com",
      birthday: "1990-01-01",
      timezone: "Asia/Jakarta",
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });
});