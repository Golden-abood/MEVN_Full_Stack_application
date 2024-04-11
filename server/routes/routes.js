const express = require("express");
const API = require("../controllers/api");
const multer = require("multer");
const router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/", API.fetchAllPost);

router.post("/", upload, API.createPost);

router.get("/:id", API.fetchPostById);

router.patch("/:id", API.updatePost);

router.delete("/:id", API.deletePost);

module.exports = router;
