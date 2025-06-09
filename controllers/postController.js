const postService = require("../services/postServices");
const errorApi = require("../Utils/ErrorApi");

const PostController = {
  createPost: async (req, res, next) => {
    try {
      const newPost = await postService.createPostServices(
        req.body,
        req.user._id
      );

      res.status(201).json({
        status: "success",
        data: {
          post: newPost,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = PostController;
