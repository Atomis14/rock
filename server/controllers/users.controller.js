const User = require('../models/user.model.js');

const getAllUsers = (req, res) => {
  User
    .find({}, '_id username createdAt')
    .sort({ username: 'asc' })
    .exec((err, users) => {
      if (err) {
        console.log(err);
        return req.status(500).send('could not get users');
      }
      res.json(users);
    });
};

module.exports = {
  getAllUsers
};