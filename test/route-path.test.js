import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
    res.send(req.originalUrl);
});

app.get("/categories/*(\\d+).json", (req, res) => {
    res.send(req.originalUrl);
});

test("Test Route Path", async () => {
    let response = await request(app).get("/products/ridwan.json");
    expect(response.text).toBe("/products/ridwan.json");

    response = await request(app).get("/products/01-shirt.json");
    expect(response.text).toBe("/products/01-shirt.json");

    response = await request(app).get("/categories/011.json");
    expect(response.text).toBe("/categories/011.json");

    response = await request(app).get("/categories/salah.json");
    expect(response.status).toBe(404);
});
