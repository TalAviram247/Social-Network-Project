import fetch from "node-fetch";
import { expect } from "chai";
import appReadyPromise from "../index.js";

describe("Contact Routes", () => {
  before(async () => {
    await appReadyPromise;
  });

  it("should save contact form", async () => {
    const response = await fetch("http://localhost:3001/contact", {
      method: "POST",
      body: JSON.stringify({
        title: "Test Title",
        email: "test@example.com",
        message: "Test Message",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data.title).to.equal("Test Title");
    expect(data.email).to.equal("test@example.com");
    expect(data.message).to.equal("Test Message");
  });

  it("should get all contact forms", async () => {
    const response = await fetch("http://localhost:3001/contact", {
      method: "GET",  
    });

    const contactForms = await response.json();
    expect(response.status).to.equal(200);
    expect(contactForms).to.be.an("array");
    expect(contactForms.length).to.greaterThan(1);
  });
});
