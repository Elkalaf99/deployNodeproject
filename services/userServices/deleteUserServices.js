const User = require("../../models/user");
const errorApi = require("../../Utils/ErrorApi");

const deleteUserServices = async (userId) => {
  if (!userId) {
    throw new errorApi("User ID is required", 400);
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new errorApi("User not found", 404);
  }
    return {data:{user} , message: "User deleted successfully" };
}

module.exports = deleteUserServices;