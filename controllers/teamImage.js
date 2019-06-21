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
      let fileName = file.originalname.split(".")[0];
      let extension = path.extname(file.originalname);
      cb(null, `${fileName}` + extension);
    }
  })
});

router.post("/", upload.single("photo"), (req, res, next) => {
  var imgUrl = req.file.location;
  var teamId = req.headers.teamid;

  models.Teamimage.findAll({
    where: {
      imgUrl: imgUrl
    }
  })
    .then(result => {
      // url이 존재한다면 아무것도 하지 않는다.
      // 존재하지 않으면 row를 생성한다.
      result.length ? res.status(200).json(req.file) : createFunc();
    })
    .catch(error => {
      console.log(error);
    });

  var createFunc = () => {
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
  };
});

router.get("/:teamId", async (req, res) => {
  let id = req.params.teamId;
  models.Teamimage.findAll({
    include: [
      {
        model: models.Team,
        where: {
          id: id
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

module.exports = router;
