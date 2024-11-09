const Post = require("../models/Post");
const fs = require("fs");
module.exports = class API {
  static async fetchAllPosts(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ mesasage: err.message });
    }
  }

  static async fetchPostById(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ mesasage: err.message });
    }
  }

  static async createPost(req, res) {
    const post = req.body;
    const imageName = req.file.originalname;
    post.image = imageName;
    console.log(imageName);

    try {
      await Post.create(post);
      res.status(201).json("Post Created Successfully");
    } catch (err) {
      res.status(400).json({ mesasage: err });
    }
  }

  static async updatePost(req, res) {
    const id = req.params.id;
    let new_img = req.body.old_img; // Default to old image if no new image is uploaded

    if (req.file) {
      new_img = req.file; // New image uploaded
      console.log("New image uploaded:", new_img);

      // Delete old image if it exists
      if (req.body.old_img) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "uploads",
          req.body.old_img
        ); // Ensure correct path
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log("Old image deleted successfully.");
          } else {
            console.log("Old image not found.");
          }
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
    }

    // Prepare the updated post data
    const newPost = { ...req.body, image: new_img };

    try {
      // Update the post in the database
      const updatedPost = await Post.findByIdAndUpdate(id, newPost, {
        new: true,
      });
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      console.log("Updated post:", updatedPost); // Log the updated post
      res
        .status(200)
        .json({ message: "Post Updated Successfully", post: updatedPost });
    } catch (err) {
      console.error("Error updating post:", err);
      res
        .status(500)
        .json({ message: "Failed to update post", error: err.message });
    }
  }

  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("../uploads" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "Posr Deleted Successfully" });
    } catch (err) {
      res.status(404).json({ message: err.mesasage });
    }
  }
};
