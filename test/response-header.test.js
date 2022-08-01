import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
    res.set({
        "X-Powered-By": "Programmer Zaman Now",
        "X-Author": "Eko"
    }).end("Success");
});

test("Test Response Header", async () => {
    const response = await request(app).get("/");
    expect(response.get("X-Powered-By")).toBe("Programmer Zaman Now");
    expect(response.get("X-Author")).toBe("Eko");
    expect(response.text).toBe("Success");
})
