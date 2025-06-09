const User = require("../../models/user");
const errorApi = require("../../Utils/ErrorApi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const updateUserServices = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new errorApi("User not found", 404);
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await user.save();
    
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
}
module.exports = updateUserServices;