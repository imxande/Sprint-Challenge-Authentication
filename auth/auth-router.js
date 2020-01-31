// this is for express and to make a router
const router = require('express').Router();

// i need bcrypt to hash passwords
const bcrypt = require('bcryptjs');

// i need jwt to handle token creation
const jwt = require('jsonwebtoken');

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

// implement login
router.post("/login", (req, res) => {
  // destructuring username and password from the body
  let { username, password } = req.body;

  // using findBy method to find specific username
  Users.findBy({ username })

    // I want the first 
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            // get me a token
            const token = signToken(user);
            
              // Upon successfully login return http status code 200 Success and token
              res.status(200).json({ token});
          } else {
            // Upon invalid credentials, return http status code 401 Unauthorized Error
              res.status(401).json({ message: "Invalid Credentials" });
          }
      })
      .catch(error => {
         // in case of an error return http status code 500 Server error
          res.status(500).json(error);
      });
});

// function 
function signToken(user) {
  
  const payload = user;

  const jwtSecret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;
