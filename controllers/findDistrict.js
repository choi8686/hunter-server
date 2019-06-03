const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/:getDistrict", (req, res) => {
  let getDistrict = req.params.getDistrict;
  models.Team.findAll({
    include: [
      {
        model: models.Location,
        where: {
          district: getDistrict
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

module.exports = router;
