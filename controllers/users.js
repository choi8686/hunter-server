const express = require("express");
const router = express.Router();

let models = require("../models");
let bcrypt = require("bcrypt");
let passport = require("passport");
let { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  //회원가입, post
  const { nickname, password } = req.body;
  try {
    const exUser = await models.User.findOne({
      where: { nickname }
    });
    if (exUser) {
      console.log("이미 했다 새끼야"); //이미 가입 했다고 알려줌
      return res.redirect("/login"); //그리고 로그인하는 곳으로 보내버림
    }
    const hash = await bcrypt.hash(password, 12); //hash 알고리즘으로 비번을 관리자도 못알아보게 해줌
    await models.User.create({
      nickname: nickname,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return res.redirect("/"); //index로 보내버림
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (authError, user) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.log("가입해 새끼야");
      return res.redirect("/signup");
    }
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log("환영한다 새끼야");
      return res.send(user);
    });
  })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next) 첨부
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
});
module.exports = router;
