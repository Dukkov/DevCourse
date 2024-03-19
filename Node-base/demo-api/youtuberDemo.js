import express from "express";

const app = express();
const port = 4000;

const youtuber1 = {
  channelTitle: "십오야",
  subscribe: "593만명",
  videoCnt: 993
}
const youtuber2 = {
  channelTitle: "침착맨",
  subscribe: "227만명",
  videoCnt: 6600
}

const db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.get("/youtuber/:id", (req, res) => {
  const youtuber = db.get(parseInt(req.params.id));

  if (youtuber)
    res.json(youtuber);
  else
    res.json({ msg: "Not found" });
});

app.listen(port, () => {
  console.log(`Port ${port} ready`);
});