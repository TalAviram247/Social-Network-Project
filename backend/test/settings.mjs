import fetch from "node-fetch";
import { expect } from "chai";
import appReadyPromise from "../index.js";

describe("Settings Controller", () => {
  before(async () => {
    await appReadyPromise;
  });

  let canUnlikePost;
  it("should get settings", async () => {
    const response = await fetch("http://localhost:3001/settings");
    const settings = await response.json();

    expect(response.status).to.equal(200);
    expect(settings).to.be.an("object");
    expect(settings).to.have.property("canDeleteOwnPost");
    expect(settings).to.have.property("canUnlikePost");
    canUnlikePost = settings.canUnlikePost;
  });

  it("should update settings", async () => {
    const response = await fetch("http://localhost:3001/settings", {
      method: "PUT",
      body: JSON.stringify({
        settingName: "canUnlikePost",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEST_TOKEN}`,
      },
    });
    expect(response.status).to.equal(200);

    {
      const response = await fetch("http://localhost:3001/settings");
      const settings = await response.json();
      expect(settings.canUnlikePost).to.equal(!canUnlikePost);
    }
    {
      const response = await fetch("http://localhost:3001/settings", {
        method: "PUT",
        body: JSON.stringify({
          settingName: "canUnlikePost",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TEST_TOKEN}`,
        },
      });
      expect(response.status).to.equal(200);
    }
    {
      const response = await fetch("http://localhost:3001/settings");
      const settings = await response.json();
      expect(settings.canUnlikePost).to.equal(canUnlikePost);
    }
  });
});
