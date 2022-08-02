import express from "express";
import request from "supertest";

const app = express();

function apiHandler(req, res, next) {
    if (req.query.name && req.query.key) {
        next();
    } else {
        res.status(401).end("Unauthorized");
    }
};

function setHeaderHandler(req, res, next) {
    res.set("X-Powered-By", "Ridwan");
    next();
};

function timeHandler(req, res, next) {
    req.timed = new Date();
    next();
}

function logger(req, res, next) {
    console.log(`Success login at ${req.timed}`);
    next();
};

app.use(apiHandler);
app.use(setHeaderHandler);
app.use(timeHandler);
app.use(logger);

app.get("/user", (req, res) => {
    res.send(`Welcome ${req.query.name}`);
});

app.get("/time", (req, res) => {
    res.send(`Welcome ${req.query.name}, Today is ${req.timed.getDate()}`);
});

test("Test Middleware Unauthorized", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
});

test("Test Middleware Success", async () => {
    const response = await request(app).get("/user").query({name: "Ridwan", key: "888" });
    expect(response.get("X-Powered-By")).toBe("Ridwan");
    expect(response.text).toBe("Welcome Ridwan");
});

test("Test Middleware Success with Time", async () => {
    const response = await request(app).get("/time").query({name: "Ridwan", key: "888" });
    expect(response.get("X-Powered-By")).toBe("Ridwan");
    expect(response.text).toBe("Welcome Ridwan, Today is 2");
});
