import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/hello", (req, res) => {
  res.json({
    "say": "Hello"
  });
});

app.get("/bye", (req, res) => {
  res.json({
    "say": "Bye"
  });
});

app.get("/nicetomeetyou", (req, res) => {
  res.json({
    "say": "Nice to meet you"
  });
});

app.listen(3000, () => {
  console.log("Port 3000 ready");
});