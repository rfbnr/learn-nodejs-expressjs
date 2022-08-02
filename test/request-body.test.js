import express from "express";
import request from "supertest";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/json", (req, res) => {
    const nameProduct = req.body.nameProduct;
    res.json({
        product: `${nameProduct}`,
    });
});

app.post("/form", (req, res) => {
    const userName = req.body.userName;
    res.json({
        name: `${userName}`,
    });
});

test("Test Response Body JSON", async () => {
    const response = await request(app)
        .post("/json")
        .set("Content-Type", "application/json")
        .send({ nameProduct: "Pants" });
    
    expect(response.body).toEqual({
        product: "Pants",
    });
});

test("Test Response Body FORM", async () => {
    const response = await request(app)
        .post("/form")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("userName=Ridwan");

    expect(response.body).toEqual({
        name: "Ridwan",
    });
});
