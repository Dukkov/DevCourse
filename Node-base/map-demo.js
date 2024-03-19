import express from "express";
import morgan from "morgan";

const app = express();
let db = new Map();
const laptop = {
  name: "Laptop",
  price: 1300000
};
const cup = {
  name: "Cup",
  price: 3000
};
const chair = {
  name: "Chair",
  price: 350000
};
const poster = {
  name: "Poster",
  price: 20000
};

app.use(morgan("dev"));

db.set(1, laptop);
db.set(2, cup);
db.set(3, chair);
db.set(4, poster);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/favicon.ico", (req, res) => {
  res.status(404).send("Not found");
});

app.get("/:key", (req, res) => {
  let {key} = req.params;
  key = parseInt(key);
  const product = db.get(key);

  if (!product) {
    res.json({
      msg: "Not found"
    });
  } else {
    product.id = key;

    res.json(product);
  }
})

app.listen(4000, () => {
  console.log("Port 4000 ready");
})