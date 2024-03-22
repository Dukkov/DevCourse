import express from "express";

const app = express();
const port = 4000;

const youtuber1 = {
  channelTitle: "십오야",
  subscribe: "593만명",
  videoCnt: 993
};
const youtuber2 = {
  channelTitle: "침착맨",
  subscribe: "227만명",
  videoCnt: 6600
};
const youtuber3 = {
  channelTitle: "코딩애플",
  subscribe: "26만명",
  videoCnt: 198
};

const db = new Map();
let key = 1;
db.set(key++, youtuber1);
db.set(key++, youtuber2);
db.set(key++, youtuber3);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.get("/youtubers", (req, res) => {
  res.json(Object.fromEntries(db));
});

app.get("/youtubers/:id", (req, res) => {
  const youtuber = db.get(parseInt(req.params.id));

  if (youtuber)
    res.json(youtuber);
  else
    res.json({ msg: "Not found" });
});

app.post("/youtubers", (req, res) => {
  const youtuber = req.body;
  db.set(key++, youtuber);

  res.json({ msg: `Welcome, ${youtuber.channelTitle}!` });
});

app.put("/youtubers/:id", (req, res) => {
  const youtuber = db.get(parseInt(req.params.id));

  if (youtuber) {
    const newTitle = req.body.channelTitle;
    youtuber.channelTitle = newTitle;

    db.set(parseInt(req.params.id), youtuber);
    res.json({ message: `Your channel title has changed to ${youtuber.channelTitle}` });
  } else {
    res.json({ message: "Not found" });
  }
});

app.delete("/youtubers", (req, res) => {
  if (db.size >= 1) {
    db.clear();
    res.json({ message: "Delete done" });
  } else {
    res.json({ message: "No entity to delete" });
  }
});

app.delete("/youtubers/:id", (req, res) => {
  const youtuber = db.get(parseInt(req.params.id));

  if (youtuber) {
    db.delete(parseInt(req.params.id));
    res.json({ message: "Delete done" });
  } else {
    res.json({ message: "Not found" });
  }
});

app.listen(port, () => {
  console.log(`Port ${port} ready`);
});