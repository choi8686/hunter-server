const express = require("express");
const router = express.Router();
const models = require("../models");

//해당 userId가 가진 team을 가져옴
router.get("/getUserIdTeam/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const getUserId = await models.User.findOne({
      include: [
        {
          model: models.Team,
          where: {
            userId: id
          }
        }
      ]
    });
    res.status(200).json({
      getUserId
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

//팀생성
router.post("", async (req, res) => {
  const { sex, count, age, comment, teamname, districtId, storeId, userId } = req.body;

  try {
    const createTeam = await models.Team.create({
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
    });
    res.send(createTeam);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

//same store에 있는 팀 list 가져오기.
router.get("/store/:getStoreId", async (req, res) => {
  let getStoreId = req.params.getStoreId;

  try {
    const getTeamFromStore = await models.Team.findAll({
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
    });
    res.send(getTeamFromStore);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

//same district에 있는 team list 가져오기
router.get("/district/:getDistrictId", async (req, res) => {
  let getDistrictId = req.params.getDistrictId;

  try {
    const getTeamFromDistrict = await models.Team.findAll({
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
    });
    res.send(getTeamFromDistrict);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

//팀 정보 수정
router.put("/change", async (req, res, next) => {
  const { count, age, comment, teamname, userId, districtId, storeId } = req.body;

  try {
    const changeTeamInfo = await models.Team.update(
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
    );
    res.send(changeTeamInfo);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
