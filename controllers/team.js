const express = require("express");
const router = express.Router();
const models = require("../models");
router.post("", (req, res) => {
  const { sex, count, age, comment, teamname, locationId, userId } = req.body;

  models.Team.create({
    //팀생성, post
    sex: sex,
    count: count,
    age: age,
    comment: comment,
    teamname: teamname,
    locationId: locationId, //각각 location마다 팀이 있으므로 locationId를 외래키로 가져오기 위해 넣음
    userId: userId, // 팀 생성한 user
    createdAt: Date(),
    updatedAt: Date()
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("", (req, res) => {
  models.Team.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});
module.exports = router;
