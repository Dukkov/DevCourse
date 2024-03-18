import express from "express";

const app = express();
let db = new Map();
db.set(1, "NoteBook");
db.set(2, "Cup");
db.set(3, "Chair");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/:key", (req, res) => {
  let {key} = req.params;
  key = parseInt(key);
  console.log(key);

  if (!db.get(key)) {
    res.json({
      msg: "Not found"
    });
  } else {
    res.json({
      id: key,
      msg: db.get(key)
    });
  }
})

app.listen(4000, () => {
  console.log("Port 4000 ready");
})