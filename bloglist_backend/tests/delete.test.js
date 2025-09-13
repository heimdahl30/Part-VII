const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("delete a blog", async () => {
  const initialBlogs = await api.get("/api/blogs");
  const initialBlogsLength = initialBlogs.body.length;
  const blogToDelete = initialBlogs.body[5];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const finalBlogs = await api.get("/api/blogs");
  const finalBlogsLength = finalBlogs.body.length;

  assert.strictEqual(finalBlogsLength, initialBlogsLength - 1);
});

after(async () => {
  await mongoose.connection.close();
});
