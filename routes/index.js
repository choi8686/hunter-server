var express = require("express");
var router = express.Router();

const usersRouter = require("../controllers/users");
const teamsRouter = require("../controllers/team");

router.use("/users", usersRouter);
router.use("/teams", teamsRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
  next();
});

module.exports = router;
