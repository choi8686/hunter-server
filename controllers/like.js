const express = require("express");
const router = express.Router();
const models = require("../models");
const uuidv4 = require("uuid/v4");

router.post("", async (req, res) => {
  const { whoLikeId, toLikeId, introText } = req.body;
  try {
    //try this code.
    const existent = await models.Like.findAll({
      //1. toLikeId find whoLikeId who liked before.
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
      where: {
        toLikeId: whoLikeId,
        whoLikeId: toLikeId
      }
    });
    if (match) {
      const uuid = uuidv4();

      await models.Match.create({
        teamId: toLikeId,
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
