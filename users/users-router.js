// import express and creating a router here
const router = require('express').Router();

// importing users model
const Users = require('./users-model.js');

// importing authenticate middleware here, still not implemented yeton its own file
const restricted = require('../auth/authenticate-middleware.js');

// handles get request
router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
