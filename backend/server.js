const express = require("express");
const app = express();
const usersRouter = require("./routers/usersRouter");
require("./configs/db");

app.use("/api/users", usersRouter);

app.listen(3000, () => {
  console.log("server 🟢");
});
