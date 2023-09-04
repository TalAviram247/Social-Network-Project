import fetch from "node-fetch";
import { expect } from "chai";
import appReadyPromise from "../index.js";

describe("User Controller", () => {
  before(async () => {
    await appReadyPromise;
  });

  it("should get all users", async () => {
    const response = await fetch("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });

    const users = await response.json();
    expect(response.status).to.equal(200);
    expect(users).to.be.an("array");
    expect(users.length).to.greaterThan(1);
  });

  it("should follow a user", async () => {
    const response = await fetch("http://localhost:3001/users/follow/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });

    const followResponse = await response.json();

    expect(response.status).to.equal(201);
    expect(followResponse.message).to.include("successfully");
  });

  it("should logout a user", async () => {
    const response = await fetch("http://localhost:3001/users/logout", {
      headers: {
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });

    const logoutResponse = await response.json();

    expect(response.status).to.equal(200);
    expect(logoutResponse.logged_out).to.equal(true);
  });
});
