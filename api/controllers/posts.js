const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.userId);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.userId);
  res.status(201).json({ message: "Post created", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
