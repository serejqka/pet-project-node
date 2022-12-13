const { User } = require('../db/models');

const cookiesCleaner = (req, res, next) => {
  if (req.cookies.user_uid && !req.session.userId) {
    res.clearCookie('user_uid');
    res.redirect('/');
  } else {
    next();
  }
};

const sessionChecker = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

const resLocals = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
  }

  next();
};

const getUser = async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findByPk(Number(req.session.userId), { raw: true });
  }

  next();
};

module.exports = {
  cookiesCleaner, sessionChecker, resLocals, getUser,
};
