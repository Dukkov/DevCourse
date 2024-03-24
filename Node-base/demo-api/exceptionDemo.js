import express from "express";

const app = express();
const port = 4000;

const arr = [
  { id: 1, name: "apple"},
  { id: 2, name: "orange"},
  { id: 3, name: "strawberry"},
  { id: 4, name: "blueberry"}
]

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/fruits", (req, res) => {
  res.json(arr);
});

app.get("/fruits/:id", (req, res) => {
  const targetFruit = arr.find(f => (f.id === parseInt(req.params.id)));
  
  if (targetFruit)
    res.status(200).json(targetFruit);
  else
    res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Port ${port} ready`);
});