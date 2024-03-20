import express from "express";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/test", (req, res) => {
  console.log(req.body.msg); 
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Port ${port} ready`);
});