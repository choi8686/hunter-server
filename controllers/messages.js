const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/getMessages/:uuid", async (req, res) => {
  try {
    const messages = await models.Message.findAll({
      where: {
        uuid: req.params.uuid
      }
    });
    res.send(messages);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
