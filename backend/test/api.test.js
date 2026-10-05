import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

process.env.JWT_SECRET = "test-secret";
process.env.JWT_EXPIRES_IN = "1h";

const owner = {
  name: "Ada Owner",
  email: "ada@example.com",
  password: "secret12",
};

const other = {
  name: "Grace Listener",
  email: "grace@example.com",
  password: "secret12",
};

async function registerAndLogin(user) {
  const response = await request(app).post("/api/auth/register").send(user);
  assert.equal(response.status, 201);
  return response.body.data.token;
}

describe("playlist API", { concurrency: 1 }, () => {
  before(async () => {
    await connectDB("mongodb://127.0.0.1:27017/playlist-platform-test");
  });

  beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const collection of Object.values(collections)) {
      await collection.deleteMany({});
    }
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("rejects a playlist with no songs", async () => {
    const token = await registerAndLogin(owner);
    const response = await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Empty", songs: [] });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
  });

  it("lets only the owner edit or delete a playlist", async () => {
    const ownerToken = await registerAndLogin(owner);
    const otherToken = await registerAndLogin(other);

    const created = await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        title: "Late night",
        description: "Quiet songs",
        songs: ["Nightride", "Holocene"],
      });

    assert.equal(created.status, 201);
    const playlistId = created.body.data._id;

    const forbidden = await request(app)
      .patch(`/api/playlists/${playlistId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ title: "Hijacked" });

    assert.equal(forbidden.status, 403);

    const forbiddenDelete = await request(app)
      .delete(`/api/playlists/${playlistId}`)
      .set("Authorization", `Bearer ${otherToken}`);

    assert.equal(forbiddenDelete.status, 403);

    const updated = await request(app)
      .patch(`/api/playlists/${playlistId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Late night drive" });

    assert.equal(updated.status, 200);
    assert.equal(updated.body.data.title, "Late night drive");

    const note = await request(app)
      .post(`/api/playlists/${playlistId}/comments`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ text: "Nice set." });
    assert.equal(note.status, 201);

    const removed = await request(app)
      .delete(`/api/playlists/${playlistId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    assert.equal(removed.status, 200);
    assert.equal(await mongoose.model("Comment").countDocuments({ playlist: playlistId }), 0);

    const missing = await request(app).get(`/api/playlists/${playlistId}`);
    assert.equal(missing.status, 404);
  });

  it("toggles likes without double counting and accepts comments", async () => {
    const ownerToken = await registerAndLogin(owner);
    const otherToken = await registerAndLogin(other);

    const created = await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Morning", songs: ["Sunrise"] });
    const playlistId = created.body.data._id;

    const firstLike = await request(app)
      .post(`/api/playlists/${playlistId}/like`)
      .set("Authorization", `Bearer ${otherToken}`);
    assert.equal(firstLike.status, 200);
    assert.equal(firstLike.body.data.liked, true);
    assert.equal(firstLike.body.data.likeCount, 1);

    const ownerLike = await request(app)
      .post(`/api/playlists/${playlistId}/like`)
      .set("Authorization", `Bearer ${ownerToken}`);
    assert.equal(ownerLike.body.data.likeCount, 2);

    const unlike = await request(app)
      .post(`/api/playlists/${playlistId}/like`)
      .set("Authorization", `Bearer ${otherToken}`);
    assert.equal(unlike.body.data.liked, false);
    assert.equal(unlike.body.data.likeCount, 1);

    const sameUserAgain = await request(app)
      .post(`/api/playlists/${playlistId}/like`)
      .set("Authorization", `Bearer ${ownerToken}`);
    assert.equal(sameUserAgain.body.data.liked, false);
    assert.equal(sameUserAgain.body.data.likeCount, 0);

    const emptyComment = await request(app)
      .post(`/api/playlists/${playlistId}/comments`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ text: "   " });
    assert.equal(emptyComment.status, 400);

    const comment = await request(app)
      .post(`/api/playlists/${playlistId}/comments`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ text: "This one stays on repeat." });
    assert.equal(comment.status, 201);

    const strangerDelete = await request(app)
      .delete(`/api/comments/${comment.body.data._id}`)
      .set("Authorization", `Bearer ${ownerToken}`);
    assert.equal(strangerDelete.status, 403);

    const details = await request(app)
      .get(`/api/playlists/${playlistId}`)
      .set("Authorization", `Bearer ${otherToken}`);
    assert.equal(details.status, 200);
    assert.equal(details.body.data.likeCount, 0);
    assert.equal(details.body.data.likedByMe, false);
    assert.equal(details.body.data.comments.length, 1);
    assert.equal(details.body.data.comments[0].user.name, other.name);

    const removedComment = await request(app)
      .delete(`/api/comments/${comment.body.data._id}`)
      .set("Authorization", `Bearer ${otherToken}`);
    assert.equal(removedComment.status, 200);
  });

  it("requires a token to create a playlist", async () => {
    const response = await request(app)
      .post("/api/playlists")
      .send({ title: "Nope", songs: ["Song"] });
    assert.equal(response.status, 401);
  });
});
