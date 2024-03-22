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
let key = 1;
db.set(key++, youtuber1);
db.set(key++, youtuber2);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.get("/youtubers", (req, res) => {
  console.log(db);
  res.json(Object.fromEntries(db));
});

app.get("/youtuber/:id", (req, res) => {
  const youtuber = db.get(parseInt(req.params.id));

  if (youtuber)
    res.json(youtuber);
  else
    res.json({ msg: "Not found" });
});

app.post("/youtuber", (req, res) => {
  const youtuber = req.body;
  db.set(key++, youtuber);

  res.json({ msg: `Welcome, ${youtuber.channelTitle}!` });
});

app.listen(port, () => {
  console.log(`Port ${port} ready`);
});