/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// need jwt to handle token
const jwt = require('jsonwebtoken');

// distructuring jwtSecret from secrets
const { jwtSecret } = require('../config/secrets.js')

// exporting all of this
module.exports = (req, res, next) => {
  // getting the token from the headers authorization in the request
  const token = req.headers.authorization;

  // fi the token exist go ahead and verify
  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        // if the token is not valid http status code Authorization Error
        res.status(401).json({ message: "Invalid Credentials Sorry Dad!"})
      } else {
        req.user = { username: decodedToken.username };

        next();
      }
    })
  } else {
    res.status(401).json({ you: ' Dad shall not pass!'})
  }
};
