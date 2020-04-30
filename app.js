const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
//import routes
const jokesRoute = require("./routes/Joke");
app.use("/jokes", jokesRoute);

//connecting to the db
mongoose.connect(
  process.env.DB_NAME,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => {
    try {
      console.log("💻 The database has connected successfully!");
    } catch (err) {
      res.send({ Error: err });
    }
  }
);
// start server
app.listen(process.env.PORT || 3000);
