const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.dbURL)
  .then(console.log("mongoDB 🥭"))
  .catch((error) => console.log(error));
