import express from "express";
import cookieParser from "cookie-parser";
import request from "supertest";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    const { name, author } = req.cookies;
    res.send(`Hello ${name}, author ${author}`);
});

app.post("/login", (req, res) => {
    const user = req.body.username;

    res.cookie("Username", user, { path: "/" });
    res.send(`Hello ${user}`);
});

test("Test Cookie Read", async () => {
    const response = await request(app)
        .get("/")
        .set("cookie", "name=Ridwan;author=PZN")
    
    expect(response.text).toBe("Hello Ridwan, author PZN");
});

test("Test Cookie Write", async () => {
    const response = await request(app)
        .post("/login")
        .send({ username: "Ridwan"})

    expect(response.get("Set-Cookie").toString()).toBe("Username=Ridwan; Path=/");
    expect(response.text).toBe("Hello Ridwan");
});
