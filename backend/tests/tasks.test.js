const request = require("supertest");
const { server, app } = require("../index");
const mongoose = require("mongoose");

describe("Tasks API", () => {
  it("should get all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toEqual(200);
  });
  it("should return an array of tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ text: "Test task" });
    expect(res.body.text).toEqual("Test task");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
