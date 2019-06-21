const express = require("express");
const router = express.Router();
const models = require("../models");

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new AWS.S3();
const path = require("path");

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "hunter-bucker/assets",
    acl: "public-read",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    }
  })
});

router.post("/", upload.single("photo"), (req, res, next) => {
  const imgUrl = req.file.location;
  const teamId = req.headers.teamid;
  console.log("==========>teamId", req.headers);
  models.Teamimage.create({
    imgUrl: imgUrl,
    teamId: teamId,
    createdAt: Date(),
    updatedAt: Date()
  })
    .then(result => {
      console.log("success");
      res.status(200).json(req.file);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/:teamId", async (req, res) => {
  let id = req.params.teamId;

  try {
    const getTeamId = await models.Teamimage.findAll({
      include: [
        {
          model: models.Team,
          where: {
            id: id
          }
        }
      ]
    });
    res.send(getTeamId);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
