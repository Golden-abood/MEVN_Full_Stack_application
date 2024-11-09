require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./connectToDb");
const cors = require("cors");

connectToDb();
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
// routes
app.use("/api/posts", require("./routes/routes"));

app.listen(PORT, () => console.log("server running on port " + PORT));
