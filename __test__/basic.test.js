"use strict";
const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.server);

describe("API Server", () => {
    it("handles not found request", async () => {
      const response = await request.get('/test');
      console.log(response);
      expect(response.status).toBe(200);
    });
});