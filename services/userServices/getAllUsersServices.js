const User = require("../../models/user");
const errorApi = require("../../Utils/ErrorApi");


const getAllUsersServices = async () => {
//   const users = await User.find({}, "-password -__v");
const users = await User.find();
  if (!users || users.length === 0) {
    throw new errorApi("No users found", 404);
  }
  
  return users;
}
module.exports = getAllUsersServices;