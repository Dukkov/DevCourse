const route = (pathname, handle, res) => {
  console.log("pathname: ", pathname);

  if (typeof handle[pathname] === "function")
    handle[pathname](res);
  else {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.write("Page not found");
    res.end();
  }
}

export default route;