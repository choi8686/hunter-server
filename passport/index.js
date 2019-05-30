const local = require("./localStrategy");
const models = require("../models");

//serializeUser = 사용자 정보 object를 세션에 id로 저장

module.exports = passport => {
  passport.serializeUser((user, done) => {
    /*req.session 객체에 어떤 데이터를 저장할지 선택.  매개변수로 user를 받아 done 함수에 두 번째 인자로 user.id를 넘김 */
    done(
      null,
      user.id
    ); /*세션에 사용자 정보를 모두 저장하면 용량이 커지므로 user.id만 저장. */
  });

  //deserializeUser = 세션에 저장한 id를 통해 사용자 정보 object를 불러옴.

  passport.deserializeUser((id, done) => {
    //passport.session() 요청시 실행됨.
    models.User.findOne({
      where: id //serializeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회함.
    })
      .then(user => done(null, user)) //조회한 정보는 req.user에 저장하므로 req.user를 통해 로그인한 사용자의 정보를 가져옴.
      .catch(err => done(err));
  });
  local(passport);
};

/* 전체적인 flow
1.로그인 요청이 들어옴.
2.passport.authenticate 메서드 호출
3.로그인 전략 수행(localstratage 참조)
4.로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5.req.login 메서드가 passport.serializeUser 호출
6.req.session에 사용자 아이디만 저장
7.로그인 완료
*/
