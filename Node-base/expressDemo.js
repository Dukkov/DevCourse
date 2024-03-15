import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products/1", (req, res) => {
  res.json({
    title: "What is Node.js?",
    price: 200,
    desc: "This book is good for your health"
  });
});

app.listen(3000, () => {
  console.log("Port 3000 ready");
});