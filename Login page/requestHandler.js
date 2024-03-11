import connection from "./database/connect/mariadb.js";

const main = (res) => {
  console.log("main");

  connection.query("SELECT * FROM product", (err, rows) => {
    console.log(rows);
  });
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("Main page");
  res.end();
};

const login = (res) => {
  console.log("login");

  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("Login page");
  res.end();
};

let handle = {};
handle["/"] = main;
handle["/login"] = login;

export default handle;