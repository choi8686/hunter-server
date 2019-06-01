exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //로그인 중이면 isAuthenticated가 true고 아니면 false.
    next();
  } else {
    res.status(403).send("go to login mother fucker");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
