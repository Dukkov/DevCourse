import http from "http";
import url from "url";

const start = (route, handle) => {
  http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let queryData = url.parse(req.url, true).query;

    route(pathname, handle, res, queryData.productId);
  }).listen(8888);
}

export default start;