const Post = require("../models/post");
module.exports = class API {
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async fetchPostById(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async createPost(req, res) {
    const post = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imgName = req.file.filename;
    post.image = imgName;
    try {
      await Post.create(post);
      res.status(201).json({ message: "post created successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  static async updatePost(req, res) {
    // const id = req.params.id;
    // const post = req.body;
    // try {
    //   await Post.update(id);
    //   res.status(200).json({ message: "post updated successfully" });
    // } catch (error) {
    //   res.status(400).json({ message: "error" });
    // }
  }
  static async deletePost(req, res) {}
};
