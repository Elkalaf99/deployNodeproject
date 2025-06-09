const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middleware/errorMiddleware");
const postRouter = require("./routers/postRouter");
require("dotenv").config();

// Set environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const server = express();
server.use(express.json());
// mongodb://mongo:AeAZAPzoUBbxMjBWSQFEiDSxWrhVkCtG@mongodb.railway.internal:27017/myAppDB
// ${{ MongoDB.MONGO_URL }}
mongoose
  .connect(
    "mongodb://mongo:AeAZAPzoUBbxMjBWSQFEiDSxWrhVkCtG@mongodb.railway.internal:27017?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

server.use("/user", userRouter);
server.use("/post", postRouter);

server.use(errorHandler);

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
