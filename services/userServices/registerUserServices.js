const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const errorApi = require("../../Utils/ErrorApi");

const registerUserServices = async (data) => {
  if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    throw new errorApi("All fields are required", 400);
  }

  if (data.password !== data.confirmPassword) {
    throw new errorApi("Passwords do not match", 400);
  }

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new errorApi("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "user",
  });

  if (!newUser) {
    throw new errorApi("User registration failed", 500);
  }
  const userWithoutPassword = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };

  return userWithoutPassword;
};

module.exports = registerUserServices;
