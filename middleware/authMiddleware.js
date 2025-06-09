const jwt = require("jsonwebtoken");
const errorApi = require("../Utils/ErrorApi");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    // 1) Check if token exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new errorApi(
        "You are not logged in. Please log in to get access.",
        401
      );
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new errorApi(
        "The user belonging to this token no longer exists.",
        401
      );
    }

    // 4) Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };
