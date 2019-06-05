const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("", async (req, res) => {
  const { whoLikeId, toLikeId } = req.body;
  try {
    //try this code.
    const existent = await models.Like.findAll({
      //1. toLikeId find whoLikeId who liked before.
      where: { whoLikeId, toLikeId }
    });
    if (existent.length == 0) {
      await models.Like.create({
        whoLikeId: whoLikeId,
        toLikeId: toLikeId
      }).then(result => {
        res.status(200).json(result);
      });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    //if you have error console.log error

    console.log(err);
  }
});

// router.post("/team1Id/team2Id", (req, res) => {
//   const { team1, team2 } = req.params;
//   models.Like.findAll({
//     where: { whoLike: team2, toLike: team1 }
//   }),
//     (error, data) => {
//       console.log("222");
//       if (error) {
//         res.status(400).json(error);
//       } else {
//         if (data == undefined || data == null || data.length == 0) {
//           models.Like.findAll({
//             where: { whoLike: team1, toLike: team2 }
//           }),
//             (error, data) => {
//               if (error) {
//                 res.status(400).json(error);
//               } else {
//                 if (data == undefined || data == null || data.length == 0) {
//                   const like = models.Like.create({
//                     whoLike: team2,
//                     toLike: team1
//                   });
//                   like.save((error, data) => {
//                     if (error) {
//                       res.status(400).json(error);
//                     } else {
//                       Response.json(data);
//                     }
//                   });
//                 } else {
//                   res.json({ message: "you already like this user!" });
//                 }
//               }
//             };
//         } else {
//           const chat = models.Message.create({
//             toTeam: team1,
//             senderTeam: team2,
//             toTeamId: team1,
//             senderTeamId: team2
//           })
//             .then(result => {
//               res.json(result);
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         }
//       }
//     };
// });

//user1 like user2 역으로 user2가 user1을 좋아한적이 있는지 체크
//없으면 좋아요를 했다는 표시를 함.
//user2가 user1을 좋아요 누르면 채팅방이 생성 됨.
//텍스트가 null인ㅇ지 아닌지로 판단해서 null이면 district, 내용이 없으면 default 갑 보낼 것.
module.exports = router;
