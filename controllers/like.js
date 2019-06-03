const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("", (req, res) => {
  //   const { user1, user2 } = req.body;
  //    if(whoLike === toLike && toLike === whoLike){
  //       models.Message.create({
  //       })
  //   }
  models.Like.findAll({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
  //   채팅방이 생성된다.
});

module.exports = router;
