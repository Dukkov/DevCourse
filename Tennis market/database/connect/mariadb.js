import mariadb from "mysql";

const connection = mariadb.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Tennis"
});

export default connection;