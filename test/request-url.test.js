import express from "express";
import request from "supertest";

const app = express();

app.get("/hello", (req, res) => {
    res.json({
        path: req.path,
        originalUrl: req.originalUrl,
        hostname: req.hostname,
        protocol: req.protocol,
        secure: req.secure
    });
});

test("Test Request URL", async () => {
    const response = await request(app).get("/hello").query({ name: "Ridwan"});
    expect(response.body).toEqual({
        path: "/hello",
        originalUrl: "/hello?name=Ridwan",
        hostname: "127.0.0.1",
        protocol: "http",
        secure: false
    })
})
