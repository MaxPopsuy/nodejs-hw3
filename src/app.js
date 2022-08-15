const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/contactRouter");
const errorHandler = require("./middlewares/errorHandler");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "*",
  })
);

app.use(errorHandler);

app.use("/api/contacts", contactsRouter);

module.exports = app;
