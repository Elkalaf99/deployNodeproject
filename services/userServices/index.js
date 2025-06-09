const registerUserServices = require("./registerUserServices");
const loginUserServices = require("./loginUserServices");
const getAllUsersServices = require("./getAllUsersServices");
const getUserByIDServices = require("./getUserByIDServices");
const deleteUserServices = require("./deleteUserServices");
const updateUserServices = require("./updateUserServices");

module.exports = {
  registerUserServices,
  loginUserServices,
  getAllUsersServices,
  getUserByIDServices,
  deleteUserServices,
  updateUserServices
};
