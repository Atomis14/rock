const Post = require('../models/post.model.js');

const getAllPosts = (req, res) => {
  Post
    .find()
    .populate('user', 'username')
    .sort({ _id: 'desc' })
    .exec((err, posts) => {
      if (err) {
        console.log(err);
        return req.status(500).send('could not get posts');
      }
      res.json(posts);
    });
};

const addPost = (req, res) => {
  const post = new Post({
    content: req.body.content,
    user: req.user._id
  });
  post.save((err, post) => {
    if (err) {
      return res.status(500).send('could not save post');
    }
    res.sendStatus(201);
  });
};

const deleteOnePost = (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id, user: req.user.id }, (err, post) => {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if(post === null) {
      return res.sendStatus(400);
    }
    res.send();
  });
};

module.exports = {
  getAllPosts,
  addPost,
  deleteOnePost
};