const Post = require("./models/Post");
const { posts } = require("./posts");
require("dotenv").config();

const { connectToDb } = require("./connectToDb");
connectToDb();
console.log(posts);
const importPosts = async () => {
  try {
    await Post.insertMany(posts);
    console.log(`importing posts`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const removePosts = async () => {
  try {
    await Post.deleteMany();
    console.log(`delteing posts`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  importPosts();
} else if (process.argv[2] === "-remove") {
  removePosts();
}
