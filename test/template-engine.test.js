import express from "express";
import mustacheExpress from "mustache-express";
import request from "supertest";

const app = express();

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    res.render("index", {
        title: "Hello World",
        paragraf: "This is sample text"
    });
});

test("Test Template Engine Mustache", async () => {
    const response = await request(app).get("/");

    console.info(response.text);
    expect(response.text).toContain("Hello World");
    expect(response.text).toContain("This is sample text");
});
