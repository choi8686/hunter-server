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
      async (email, password, done) => {
        //callback 함수
        try {
          const exUser = await models.User.findOne({ where: { email } }); // ex model qeury first - 1
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
