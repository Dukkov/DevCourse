import express from "express";
import userRouter from "./routes/users.js";
import channelRouter from "./routes/channels.js";

const app = express();
const port = 4000;

app.use("/", userRouter);
app.use("/channels", channelRouter);

app.listen(port, () => {
  console.log(`Port ${port} ready`);
});