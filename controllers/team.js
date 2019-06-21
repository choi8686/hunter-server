const express = require("express");
const router = express.Router();
const models = require("../models");

//해당 userId가 가진 team을 가져옴
router.get("/getUserIdTeam/:id", (req, res) => {
  let id = req.params.id;
  models.User.findOne({
    include: [
      {
        model: models.Team,
        where: {
          userId: id
        }
      }
    ]
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

//팀생성
router.post("", (req, res) => {
  const { sex, count, age, comment, teamname, districtId, storeId, userId } = req.body;

  models.Team.create({
    //팀생성, post
    sex: sex,
    count: count,
    age: age,
    comment: comment,
    teamname: teamname,
    districtId: districtId,
    storeId: storeId, //각각 location마다 팀이 있으므로 locationId를 외래키로 가져오기 위해 넣음
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

//same store에 있는 팀 list 가져오기.
router.get("/store/:getStoreId", async (req, res) => {
  let getStoreId = req.params.getStoreId;

  models.Team.findAll({
    include: [
      {
        model: models.Store,
        where: {
          id: getStoreId
        }
      },
      {
        model: models.Teamimage,
        attributes: ["imgUrl"]
      }
    ]
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//same district에 있는 team list 가져오기
router.get("/district/:getDistrictId", (req, res) => {
  let getDistrictId = req.params.getDistrictId;
  models.Team.findAll({
    include: [
      {
        model: models.District,
        where: {
          id: getDistrictId
        }
      },
      {
        model: models.Teamimage,
        attributes: ["imgUrl"]
      }
    ]
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

//팀 정보 수정
router.put("/change", async (req, res, next) => {
  const { count, age, comment, teamname, userId, districtId, storeId } = req.body;

  await models.Team.update(
    {
      count: count,
      age: age,
      comment: comment,
      teamname: teamname,
      districtId: districtId,
      storeId: storeId
    },
    {
      where: {
        userId: userId
      }
    }
  )
    .then(result => {
      console.log("팀 수정했다 새끼야");
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
