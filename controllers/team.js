const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("", (req, res) => {
  const { sex, count, age, comment, teamname, locationId, userId } = req.body;

  models.Team.create({
    //팀생성, post
    sex: sex,
    count: count,
    age: age,
    comment: comment,
    teamname: teamname,
    locationId: locationId, //각각 location마다 팀이 있으므로 locationId를 외래키로 가져오기 위해 넣음
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

// router.get("", (req, res) => {
//   models.Team.findAll({
//     include: [
//       {
//         model: models.Location,
//         attributes: ["district", "store"]
//       },
//       {
//         model: models.Teamimage,
//         attributes: ["imgUrl"]
//       }
//     ]
//   })
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });
router.get("/:getStore", async (req, res) => {
  let getStore = req.params.getStore;

  models.Team.findAll({
    include: [
      {
        model: models.Location,
        where: {
          store: getStore
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

// router.get("/:getDistrict", async (req, res) => {
//   let getDistrict = req.params.getDistrict;
//   models.Team.findAll({
//     include: [
//       {
//         model: models.Location,
//         where: {
//           district: getDistrict
//         }
//       }
//     ]
//   })
//     .then(result => {
//       res.json(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// router.get("/:district", async (req, res) => {
//   let getDistrict = await models.Team.findAll({
//     include: [
//       {
//         model: models.Location,
//         where: { district: req.params.district }
//       }
//     ]
//   });
//   getDistrict = getDistrict.district;
//   models.Team.findAll({
//     include: [
//       {
//         model: models.Location,
//         attributes: ["district"]
//       }
//     ]
//   })
//     .then(result => {
//       res.status(200).send(result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// router.get("/:store", async (req, res) => {
//   let getStore = await models.Location.findAll({
//     where: { id: req.params.id }
//   });
//   getStore = getStore.store;
//   console
//     .log("======>", getStore)
//     .then(result => {
//       res.status(200).send(result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// models.Team.findAll({
//   include: [
//     {
//       model: models.Location,
//       store: getStore
//     }
//   ]
// })

// router.get("/:store", (req, res) => {
//   const { id } = req.params.id;
//   models.Team.findAll({
//     include: [
//       {
//         model: models.Location,
//         through: { where: { id: id } },
//         attributes: ["store"]
//       }
//     ]
//   })
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });
// [
//   {
//     model: Category,
//     through: { where: { year: 2015 } },
//     attributes: ["id"]
//   }
// ];
// router.get("", (req, res) => {
//   models.Team.findAll({
//     include: [
//       {
//         model: models.Location,
//         attributes: ["district", "store"]
//       },
//       {
//         model: models.Teamimage,
//         attributes: ["imgUrl"]
//       }
//     ]
//   })
//     .then(result => {
//       console.log(result[0].dataValues);
//       res.status(200).json(result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// router.get("/:store", (req, res) => {
//   models.Team.findAll({
//     model: models.Location,
//     where: { store: req.params.store }
//   })
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });
module.exports = router;
