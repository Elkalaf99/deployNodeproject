const express = require("express");
const postController = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const postRouter = express.Router();

// Protect all post routes
postRouter.use(protect);

postRouter.post("/create", postController.createPost);

module.exports = postRouter;
