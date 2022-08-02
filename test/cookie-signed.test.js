import express from "express";
import cookieParser from "cookie-parser";
import request from "supertest";

const app = express();
app.use(cookieParser("CONTOHSECRETKEYRAHASIA"));
app.use(express.json());

app.get("/", (req, res) => {
    // const user = req.signedCookies["Username"];  *atau bisa seperti ini juga*
    const user = req.signedCookies.Username;
    
    res.send(`Hello ${user}`);
});

app.post("/login", (req, res) => {
    const user = req.body.username;

    res.cookie("Username", user, { path: "/", signed: true });
    res.send(`Hello ${user}`);
});

test("Test Signed Cookie Read", async () => {
    const response = await request(app)
        .get("/")
        .set("Cookie", "Username=s%3ARidwan.ONNt%2FDkuuiVZCIbUZ8SZPYo6x%2BUGJrBogyGdqwux2ho; Path=/");
    
    expect(response.text).toBe("Hello Ridwan");
});

test("Test Signed Cookie Write", async () => {
    const response = await request(app)
        .post("/login")
        .send({ username: "Ridwan" })
    
    // console.log(response.get("Set-Cookie"));
    expect(response.get("Set-Cookie").toString()).toContain("Ridwan");
    expect(response.text).toBe("Hello Ridwan");
});
