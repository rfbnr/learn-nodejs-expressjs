import express from "express";
import request from "supertest";

const app = express();

const router = express.Router();

router.use((req, res, next) => {
    if (req.query.name) {
        next();
    } else {
        res.end("No query specified");
    }
});

router.get('/user', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});


test("Test Router Disabled", async () => {
    let response = await request(app).get("/user");
    expect(response.status).toBe(404);
});

test("Test Router Enabled No query specified", async () => {
    app.use(router);

    let response = await request(app).get("/user");
    expect(response.text).toBe("No query specified");
});

test("Test Router Enabled", async () => {
    app.use(router);

    let response = await request(app).get("/user").query({ name: "Ridwan"});
    expect(response.text).toBe("Hello Ridwan");
});
