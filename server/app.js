require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// connect with db
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to the databse"))
  .catch((err) => console.log(err));

// routes
app.use("/api/posts", require("./routes/routes"));

app.listen(port, () => console.log("server running on port " + port));
