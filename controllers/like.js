const express = require("express");
const router = express.Router();
const models = require("../models");
const uuidv4 = require("uuid/v4");

router.post("", async (req, res) => {
  const { whoLikeId, toLikeId, introText } = req.body;
  try {
    //try this code.
    const existent = await models.Like.findAll({
      //toLikeId find whoLikeId who liked before.
      where: { whoLikeId, toLikeId }
    });
    if (existent.length == 0) {
      await models.Like.create({
        whoLikeId: whoLikeId,
        toLikeId: toLikeId,
        introText: introText
      });
    }
    const match = await models.Like.findOne({
      //find liked each other.
      where: {
        toLikeId: whoLikeId,
        whoLikeId: toLikeId
      }
    });
    // if they matched create new Match in Match table.
    if (match) {
      const uuid = uuidv4();

      const created = await models.Match.create({
        teamId: whoLikeId,
        status: 1,
        uuid //they have a same uuid.
      });
      await models.Match.create({
        teamId: toLikeId,
        status: 1,
        uuid
      });
    }

    res.status(200).json({
      success: true
    });
  } catch (err) {
    //if you have error console.log error
    console.log(err);
  }
});

module.exports = router;
