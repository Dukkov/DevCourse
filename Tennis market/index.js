import start from "./server.js"
import route from "./router.js"
import handle from "./requestHandler.js"
import connection from "./database/connect/mariadb.js";

connection.connect();
start(route, handle);