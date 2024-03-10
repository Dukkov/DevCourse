const main = (res) => {
  console.log("main");

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