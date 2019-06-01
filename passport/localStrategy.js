const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

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
          const exUser = await models.User.findOne({ where: { nickname } }); // ex model query first - 1
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password); //ex password query after models.User- 2
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "꺼져" });
            }
          } else {
            done(null, false, { message: "가입해" });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: "JWT_SECRET"
//     },
//     function(jwtPayload, cb) {
//       //find the user in db if needed
//       return models.User.findOne({ where: { id: jwtPayload.id } })
//         .then(user => {
//           return cb(null, user);
//         })
//         .catch(err => {
//           return cb(err);
//         });
//     }
//   )
// );

// const passport = require("passport");
// const passportJWT = require("passport-jwt");
// const models = require("./models");
// const ExtractJWT = passportJWT.ExtractJwt;

// const LocalStrategy = require("passport-local").Strategy;
// const JWTStrategy = passportJWT.Strategy;

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "nickname",
//       passwordField: "password"
//     },
//     function(nickname, password, cb) {
//       //Assume there is a DB module pproviding a global UserModel
//       return models.User.findOne({ nickname, password })
//         .then(user => {
//           if (!user) {
//             return cb(null, false, { message: "Incorrect email or password." });
//           }

//           return cb(null, user, {
//             message: "Logged In Successfully"
//           });
//         })
//         .catch(err => {
//           return cb(err);
//         });
//     }
//   )
// );

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: "JWT_SECRET"
//     },
//     function(jwtPayload, cb) {
//       //find the user in db if needed
//       return models.User.findOneById(jwtPayload.id)
//         .then(user => {
//           return cb(null, user);
//         })
//         .catch(err => {
//           return cb(err);
//         });
//     }
//   )
// );
