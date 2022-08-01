import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
    res.set("Content-Type", "text/html")
    res.send(`<h1>Hello ${req.query.name}</h1>`);
});

test("Test Response Body", async () => {
    const response = await request(app).get("/").query({ name: "Ridwan" });
    expect(response.get("Content-Type")).toContain("text/html");
    expect(response.text).toBe(`<h1>Hello Ridwan</h1>`);
})
