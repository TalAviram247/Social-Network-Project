import fetch from "node-fetch";
import { expect } from "chai";
import appReadyPromise from "../index.js";

describe("Post Controller", () => {
  let postId;
  before(async () => {
    await appReadyPromise;
  });

  it("should add a new post", async () => {
    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      body: JSON.stringify({
        content: "New post content",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });

    const newPost = await response.json();
    expect(response.status).to.equal(200);
    expect(newPost.content).to.equal("New post content");
    postId = newPost.id;
  });

  it("should like a post", async () => {
    const response = await fetch(`http://localhost:3001/post/like/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });
    expect(response.status).to.equal(200);
  });

  it("should get all posts", async () => {
    const response = await fetch("http://localhost:3001/post", {
      headers: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });

    const posts = await response.json();

    expect(response.status).to.equal(200);
    expect(posts).to.be.an("array");
    expect(posts.length).to.greaterThan(1);
  });

  it("should delete a post", async () => {
    const deleteResponse = await fetch(`http://localhost:3001/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });

    expect(deleteResponse.status).to.equal(200);
    const deleteResponseData = await deleteResponse.json();
    expect(deleteResponseData.message).to.equal("Post deleted");
  });
});
