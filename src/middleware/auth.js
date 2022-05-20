const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('isLoggedIn===', token);
    req.user = jwt.verify(token, jwtSecret);
    console.log('isLoggedIn===', req.user);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Invalid token' });
  }
};

module.exports = isLoggedIn;
