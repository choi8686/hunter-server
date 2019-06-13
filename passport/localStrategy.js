const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwtSecret = require("../config/jwtConfig");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const models = require("../models");

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        //LocalStrategy의 첫 번째 인자로 주어진 객체는 전략에 관한 설정
        usernameField: "nickname",
        passwordField: "password"
      },
      async (nickname, password, done) => {
        //callback 함수
        try {
          const exUser = await models.User.findOne({ where: { nickname: nickname } }); // ex model query first - 1
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password); //ex password query after models.User- 2
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "Incorrect password nigga." });
            }
          } else {
            done(null, false, { message: "please sign in mother fucker." });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtSecret.secret
  };
  passport.use(
    "jwt",
    new JWTStrategy(opts, (jwt_payload, done) => {
      try {
        models.User.findOne({
          where: {
            nickname: jwt_payload.id
          }
        }).then(user => {
          if (user) {
            console.log("user found in db in passport");
            done(null, user);
          } else {
            console.log("user not found in db");
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    })
  );
};
