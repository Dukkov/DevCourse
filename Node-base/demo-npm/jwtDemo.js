import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = jwt.sign({ foo: "bar" }, process.env.SECRET_KEY);

console.log(token);

const decoded = jwt.verify(token, process.env.SECRET_KEY)

console.log(decoded);