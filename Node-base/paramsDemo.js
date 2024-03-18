import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products/:num", (req, res) => {
  res.json({
    num: parseInt(req.params.num)
  });
});

app.listen(3000, () => {
  console.log("Port 3000 ready");
});