require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8003;
require("./db/conn");
const userdb = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(router);

//get api
app.get("/", (req, res) => {
  res.status(200).json("server started...");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
