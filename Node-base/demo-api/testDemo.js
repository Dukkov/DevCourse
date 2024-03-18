import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/test/:id", (req, res) => {
  if (req.params.id)
    res.send(`${req.params.id}!`)
  else {
    res.send("TEST SUCCESS");
  }
});

app.listen(3000, () => {
  console.log("Port 3000 ready");
});