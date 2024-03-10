import http from "http";
import url from "url";

const start = (route, handle) => {
  http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;

    route(pathname, handle, res);
  }).listen(8888);
}

export default start;