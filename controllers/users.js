const express = require("express");
const router = express.Router();

const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/signup", async (req, res, next) => {
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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "JWT_SECRET");

      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
