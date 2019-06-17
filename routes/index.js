var express = require("express");
var router = express.Router();

const usersRouter = require("../controllers/users");
const teamsRouter = require("../controllers/team");
const likeRouter = require("../controllers/like");
const imageUploadRouter = require("../controllers/teamImage");
const messageRouter = require("../controllers/messages");
// const storeRouter = require("../controllers/store");
// const districtRouter = require("../controllers/district");

router.use("/users", usersRouter);
router.use("/teams", teamsRouter);
router.use("/like", likeRouter);
router.use("/upload", imageUploadRouter);
router.use("/messages", messageRouter);
// router.use("/store", storeRouter);
// router.use("/district", storeRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
  next();
});

module.exports = router;
