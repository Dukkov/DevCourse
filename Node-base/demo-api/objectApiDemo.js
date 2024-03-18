import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

let youtuber1 = {
  channelTitle: "십오야",
  subscribe: "593만명",
  videoCnt: 993
}

let youtuber2 = {
  channelTitle: "침착맨",
  subscribe: "227만명",
  videoCnt: 6600
}

app.get("/:nickname", (req, res) => {
  const {nickname} = req.params;

  if (nickname === "15ya")
    res.json(youtuber1);
  else if (nickname === "chimchakman")
    res.json(youtuber2)
  else
    res.json({msg: "듣보"});
});

app.listen(4000, () => {
  console.log("Port 4000 ready");
});