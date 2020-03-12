require('dotenv').config();
const express = require("express");
const server = express();
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

server.use(express.json());

const port = process.env.PORT || 5000;

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.listen(port, () => {
    console.log(`\n* Server listening on http://localhost:${port} *\n`);
});

module.exports = server;