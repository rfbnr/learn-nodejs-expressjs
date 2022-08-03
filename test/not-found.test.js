import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello Response");
});

app.use((req, res, next) => {
    res.status(404).send("Page doesn't exist");
});

test("Test Response", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello Response");
});

test("Test Response Not Found", async () => {
    const response = await request(app).get("/about");
    expect(response.text).toBe("Page doesn't exist");
});
