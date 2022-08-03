import express from "express";
import fileUpload from "express-fileupload";
import request from "supertest";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.post("/json", (req, res) => {
    const nameProduct = req.body.nameProduct;
    res.json({
        product: `${nameProduct}`,
    });
});

test("Test Request Body JSON", async () => {
    const response = await request(app)
        .post("/json")
        .set("Content-Type", "application/json")
        .send({ nameProduct: "Pants" });

    expect(response.body).toEqual({ product: "Pants", });
});

app.post("/form", (req, res) => {
    const userName = req.body.userName;
    res.json({
        name: `${userName}`,
    });
});

test("Test Request Body Form", async () => {
    const response = await request(app)
        .post("/form")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("userName=Ridwan");

    expect(response.body).toEqual({ name: "Ridwan", });
});

app.post("/file", async (req, res) => {
    const nameFile = req.files.article;
    await nameFile.mv(__dirname + "/upload/" + nameFile.name);

    res.send(`Hello ${req.body.name}, you uploaded ${nameFile.name}`);
});

test("Test Request Body File Upload", async () => {
    const response = await request(app)
        .post("/file")
        .set("Content-Type", "multipart/form-data")
        .field("name", "Ridwan")
        .attach("article", __dirname + "/contoh.txt");

    expect(response.text).toBe("Hello Ridwan, you uploaded contoh.txt");
});
