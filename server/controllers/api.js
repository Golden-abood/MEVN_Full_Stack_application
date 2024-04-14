const post = require("../models/post");
const Post = require("../models/post");
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
    const imageName = req.file.filename;
    post.image = imageName;

    try {
      await Post.create(post);
      res.status(201).json("Post Created Successfully");
    } catch (err) {
      res.status(400).json({ mesasage: err.message });
    }
  }

  static async updatePost(req, res) {
    const id = req.params.id;
    let new_img = "";
    if (req.file) {
      new_img = req.file.filename;
      try {
        fs.unlink("../uploads" + req.body.old_img);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_img = req.body.old_img;
    }
    const newPost = req.body;
    newPost.image = new_img;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "Post Updated Successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
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

// static async fetchAllPost(req, res) {
//   try {
//     const posts = await Post.find();
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// }
// static async fetchPostById(req, res) {
//   const id = req.params.id;
//   try {
//     const post = await Post.findById(id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// }
// static async createPost(req, res) {
//   const post = req.body;
//   const imageName = req.file.filename;
//   post.image = imageName;
//   try {
//     await Post.create(post);
//     res.status(201).json({ message: "post created successfully" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }
// static async updatePost(req, res) {
//   const id = req.params.id;
//   const post = req.body;
//   try {
//     await Post.patch(id);
//     res.status(200).json({ message: "post updated successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "error" });
//   }
// }
// static async deletePost(req, res) {}
