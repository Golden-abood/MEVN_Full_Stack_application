const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/", API.fetchAllPosts);

router.get("/:id", API.fetchPostById);

router.post("/", upload, API.createPost);

router.patch("/:id", upload, API.updatePost);

router.delete("/:id", API.deletePost);

module.exports = router;
