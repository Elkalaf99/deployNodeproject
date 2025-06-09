const User = require("../../models/user");
const errorApi = require("../../Utils/ErrorApi");

const getUserByIDServices = async (userId) => {
  if (!userId) {
    throw new errorApi("User ID is required", 400);
  }

  //const user = await User.findById(userId).select("-password -__v");
  const user = await User.findById(userId);

  if (!user) {
    throw new errorApi("User not found", 404);
  }

  return user;
};
module.exports = getUserByIDServices;
