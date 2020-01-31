// this is for express and to make a router
const router = require('express').Router();

// i need bcrypt to hash passwords
const bcrypt = require('bcryptjs');

// importing user model here
const Users = require('../users/users-model.js')

// implement registration
router.post('/register', (req, res) => {

  // user will be in the body of the request
    let user = req.body;

    // I need to hash the password and add salt
    const hash = bcrypt.hashSync(user.password, 8);

    // hash is assigned to users password instead here, adds protection
    user.password = hash; 

    // using the add method to add user to the data base
    Users.add(user)
    .then(saved => {
      
      // return the response saved with a http status code of 201, sucess
        res.status(201).json(saved);
    })
    .catch(error => {

      // in case of an error return http status code 500 Server error
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
