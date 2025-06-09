const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const utils = require("util");
const errorApi = require("../../Utils/ErrorApi");

const jwtSign = utils.promisify(jsonwebtoken.sign);

const loginUserServices = async (data) => {
  if (!data.email || !data.password) {
    throw new errorApi("Email and password are required", 400);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(data.email)) {
    throw new errorApi("Invalid email format", 400);
  }

  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new errorApi("Invalid email or password", 401); // Generic message for security
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new errorApi("Invalid email or password", 401); 
  }

  const token = await jwtSign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    }
  );
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

module.exports = loginUserServices;
