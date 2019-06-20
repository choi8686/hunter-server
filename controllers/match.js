const express = require("express");
const router = express.Router();
const models = require("../models");
const sequelize = require("sequelize").Sequelize;
const Op = sequelize.Op;

router.get("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let result = [];
    let matches = await models.Match.findAll({
      where: {
        teamId: id //teamId = 내 userId
      }
    });
    if (matches.length == 0) {
      //매치가 없으면 무한루프를 돌 수 있음으로 예외처리 해줌.
      res.send([]);
    }
    matches.forEach(async (match, ind) => {
      let uuid = match.uuid;
      let current = match.dataValues;

      let otherTeam = await models.Match.findOne({
        //busca match con mismo uuid pero de otro team.
        where: {
          uuid,
          teamId: {
            [Op.ne]: id //요청할때 보낸 id가 아니라 매치한 팀의 id.
          }
        },
        include: [
          {
            model: models.Team,
            include: [
              {
                model: models.Teamimage,
                attributes: ["imgUrl"]
              }
            ]
          }
        ]
      });

      current.otherTeam = otherTeam.team.dataValues;
      result.push(current);
      if (ind == matches.length - 1) {
        //problema de async await

        res.status(200).json(result);
      }
    });
    console.log({ result });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

router.put("/cancelmatch/:uuid", async (req, res) => {
  try {
    const unMatch = await models.Match.update(
      {
        status: 0
      },
      {
        where: {
          uuid: req.params.uuid
        }
      }
    );
    res.send(unMatch);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
