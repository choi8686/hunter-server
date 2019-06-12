const express = require("express");
const router = express.Router();
const models = require("../models");
let { isNotLoggedIn } = require("./middlewares");

router.get("/:id", isNotLoggedIn, function(req, res, next) {
  const id = req.params;
  models.Message.findAll({
    where: {
      senderTeamId: id
    }
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
