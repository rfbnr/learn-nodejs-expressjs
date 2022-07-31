import express from 'express';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.get("/product", (req, res) => {
    res.send("Hello Product")
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
