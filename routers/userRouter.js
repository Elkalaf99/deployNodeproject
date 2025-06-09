const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/all", userController.getAllUsers);
userRouter.get("/:id", userController.getUserByID);
userRouter.delete("/:id", userController.deleteUserByID);
userRouter.put("/:id", userController.updateUser);

module.exports = userRouter;
