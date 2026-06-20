const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  // GET TOKEN FROM HEADER
  const token = req.header('Authorization');

  // CHECK IF TOKEN EXISTS
  if (!token) {

    return res.status(401).json({
      message: 'Access denied'
    });

  }

  try {

    // VERIFY TOKEN
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // SAVE USER DATA
    req.user = verified;

    // GO TO NEXT FUNCTION
    next();

  } catch (err) {

    res.status(400).json({
      message: 'Invalid token'
    });

  }

};