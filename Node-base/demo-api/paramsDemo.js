import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.get("/:nickname", (req, res) => {
//   const param = req.params;

//   res.json({
//     channel: param.nickname
//   });
// });

app.get("/watch", (req, res) => {
  const {v, t} = req.query;

  res.json({
    video: v,
    time:  t
  });
});

app.listen(4000, () => {
  console.log("Port 4000 ready");
});