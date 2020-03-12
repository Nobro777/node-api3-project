const express = require("express");
const posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  posts.get()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: "could not find posts" }));
});

router.get("/:id", (req, res) => {
  posts.getById(req.params.id)
    .then(data => res.json(data))
    .catch(err =>
      res.status(404).json({ message: "could not find posts with this ID" })
    );
});

router.delete("/:id", (req, res) => {
  posts.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `post has been deleted` });
    })
    .catch(err => res.status(404).json({ message: "could not delete post" }));
});

router.put("/:id", (req, res) => {
  posts.update(req.params.id, req.text)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: "could not update post" }));
});

module.exports = router;