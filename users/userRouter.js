const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  users.insert(req.user)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: "User cannot be made" }));
});

router.get("/", logger, (req, res) => {
  
  const environment = process.env;
  const port = process.env.port || 5000;
  
  users.get()
    .then(data => res.status(200).json({
      api:"working",
      port,
      data,
      environment
    }))
    .catch(err => res.status(404).json({ message: "could not find users" }));
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
}); 

router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.status(404).json({ message: "could not find posts by that id"}))
});

router.post("/:id/posts", validatePost, validateUserId, validatePostId, (req, res) => {
  posts.insert(req.text)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: "Post cannot be made" }));

});

router.delete("/:id", validateUserId, (req, res) => {
  users.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `User has been deleted` });
    })
    .catch(err => res.status(404).json({ message: "could not delete user" }));
});

router.put("/:id", validateUser, validatePostId, (req, res) => {
  users.update(req.params.id, req.user)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: "could not update user" }));
});

//custom middleware

//WORKING - DONT CHANGE!!
function validateUserId (req, res, next) {
    users
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "could not find user with that ID" });
        }
      })
      .catch(err =>
        res.status(500).json({ message: "error getting user with that ID" })
      );
};
// WORKING - DONT CHANGE!!

// WORKING - DONT CHANGE!!
function validateUser (req, res, next) {
    resource = {
      name: req.body.name
    };
    if (!req.body.name) {
      return res.status(400).json({ message: "missing user data" });
    } else {
      req.user = resource;
      next();
    }
}
// WORKING - DONT CHANGE!!

// WORKING - DONT CHANGE!!
function validatePost (req, res, next) {
    resource = {
      text: req.body.text,
      user_id: req.params.id
    };
    if (!req.body.text) {
      return res.status(400).json({ message: "missing post data" });
    } else {
      req.text = resource;
      next();
    }
}
// WORKING - DONT CHANGE!!

// WORKING - DONT CHANGE!!
function validatePostId (req, res, next) {
    posts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "could not find post with that ID" });
      }
    })
    .catch(err => 
      res.status(500).json({ message: "error getting post with that ID" })
    );
}
// WORKING - DONT CHANGE!!

// WORKING - DONT CHANGE!!
function logger (req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  console.log(`${method} to ${endpoint}`);
  next();
};
// WORKING - DONT CHANGE!!

module.exports = router;
