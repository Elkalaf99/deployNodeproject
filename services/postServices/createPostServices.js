const Post = require("../../models/post");
const errorApi = require("../../Utils/ErrorApi");

const createPostServices = async (data, userId) => {
  const { title, content } = data;

  // Input validation
  if (!title || !content) {
    throw new errorApi("Title and content are required", 400);
  }

  // Create new post
  const newPost = await Post.create({
    title,
    content,
    user: userId,
  });

  if (!newPost) {
    throw new errorApi("Failed to create post", 500);
  }

  // Populate user details
  await newPost.populate("user", "name email");

  return newPost;
};

module.exports = createPostServices;
