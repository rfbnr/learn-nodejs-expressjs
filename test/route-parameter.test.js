import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
    const idProduct = req.params.id;
    res.send(`idProduct: ${idProduct}`);
});

app.get("/categories/:id(\\d+)", (req, res) => {
    const idCategory = req.params.id;
    res.send(`idCategory: ${idCategory}`);
});

app.get("/products/:idProduct(\\d+)/categories/:nameCategory", (req, res) => {
    const { idProduct, nameCategory } = req.params;
    res.send(`idProduct: ${idProduct}, nameCategory: ${nameCategory}`);
});

test("Test Route Parameter", async () => {
    let response = await request(app).get("/products/shirt");
    expect(response.text).toBe("idProduct: shirt");

    response = await request(app).get("/products/pants");
    expect(response.text).toBe("idProduct: pants");

    response = await request(app).get("/categories/011");
    expect(response.text).toBe("idCategory: 011");

    response = await request(app).get("/categories/salah.json");
    expect(response.status).toBe(404);
});

test("Test Route Parameter 2", async () => {
    let response = await request(app).get("/products/001/categories/shirt");
    expect(response.text).toBe("idProduct: 001, nameCategory: shirt");

    response = await request(app).get("/products/01-salah/categories/shirt");
    expect(response.status).toBe(404);
});
