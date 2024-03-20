require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// router
const authRouter = require("./route/Auth");

// db
const connectDb = require("./db/connect");

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser(process.env.SECRET));

// route
app.use("/api/v1", authRouter);

// start mongo and sever
const start = async () => {
  try {
    await connectDb(process.env.URI);
    app.listen(port, () => console.log(`Sever is listening on port : ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
