const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    if (!cookie) throw new Error('You must be signed in to continue');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};