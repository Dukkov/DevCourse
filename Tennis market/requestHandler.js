import fs from "fs";
import connection from "./database/connect/mariadb.js";

const main_view = fs.readFileSync("./index.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderList.html", "utf-8");

const main = (res) => {
  console.log("main");

  connection.query("SELECT * FROM product", (err, rows) => {
    console.log(rows);
  });
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(main_view);
  res.end();
};

const indexCss = (res) => {
  fs.readFile("./index.css", (err, data) => {
    res.writeHead(200, {"Content-Type": "text/css"});
    res.write(data);
    res.end();
  })
}

const orderListCss = (res) => {
  fs.readFile("./orderList.css", (err, data) => {
    res.writeHead(200, {"Content-Type": "text/css"});
    res.write(data);
    res.end();
  })
}

const redRacket = (res) => {
  fs.readFile("./img/redRacket.png", (err, data) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(data);
    res.end();
  })
}

const blueRacket = (res) => {
  fs.readFile("./img/blueRacket.png", (err, data) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(data);
    res.end();
  })
}

const blackRacket = (res) => {
  fs.readFile("./img/blackRacket.png", (err, data) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(data);
    res.end();
  })
}

const order = (res, productId) => {
  res.writeHead(200, {"Content-Type": "text/html"});

  connection.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", (data, rows) => {
    console.log(rows);
  });
  res.write("order page");
  res.end();
}

const orderlist = (res) => {
  res.writeHead(200, {"Content-Type": "text/html"});

  connection.query("SELECT * FROM orderlist", (data, rows) => {
    res.write(orderlist_view);
    rows.forEach(element => {
      res.write(
        "<tr>" 
        + "<td>" + element.product_id + "</td>"
        + "<td>" + element.order_date + "</td>"
        + "</tr>");
    });

    res.write("</table>");
    res.end();
  });
}

let handle = {};
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;
handle["/index.css"] = indexCss;
handle["/orderList.css"] = orderListCss;
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

export default handle;