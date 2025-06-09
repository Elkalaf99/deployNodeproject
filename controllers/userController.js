const usersService = require("../services/userServices");
const errorApi = require("../Utils/ErrorApi");

const UserController = {
  registerUser: async (req, res, next) => {
    try {
      const newUser = await usersService.registerUserServices(req.body);
      res.status(201).json({
        status: "success",
        data: { user: newUser },
      });
    } catch (error) {
      next(error);
    }
  },
  loginUser : async (req, res, next) => {
    try {
      const user = await usersService.loginUserServices(req.body);
      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await usersService.getAllUsersServices();
      res.status(200).json({
        status: "success",
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  },
  getUserByID: async (req, res, next) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        throw new errorApi("User ID is required", 400);
      }
      const user = await usersService.getUserByIDServices(userId);
      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUserByID: async (req, res, next) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        throw new errorApi("User ID is required", 400);
      }
      const result = await usersService.deleteUserServices(userId);
      res.status(200).json({
        status: "success",
        data: result.data,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        throw new errorApi("User ID is required", 400);
      }
      const updatedUser = await usersService.updateUserServices(req, res);
      res.status(200).json({
        status: "success",
        data: { user: updatedUser },
      });
    } catch (error) {
      next(error);
    }
  },
  
};

module.exports = UserController;
