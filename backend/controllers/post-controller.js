const { db } = require("../db/persist");

const postController = {
  addPost: (req, res) => {
    try {
      const { content } = req.body;
      if (content.length > 300) throw new Error("Content is too long");

      const { username } = res.locals.token;
      if (!content) {
        throw new Error("Content is required");
      }
      const newPost = db.addNewPost({ content, username });
      db.logActivity(username, "New post");
      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  likePost: (req, res) => {
    try {
      const { postId } = req.params;
      const { username } = res.locals.token;
      const post = db.likePost(postId, username);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllPosts: (req, res) => {
    try {
      const posts = db.getAllPosts();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deletePost: (req, res) => {
    try {
      const { postId } = req.params;
      const { username } = res.locals.token;
      db.deletePost(postId, username);
      res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = { postController };
