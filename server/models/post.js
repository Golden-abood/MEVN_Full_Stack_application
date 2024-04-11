const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  category: String,
  image: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
