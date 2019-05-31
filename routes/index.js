var express = require("express");
var router = express.Router();
var passport = require("passport");

const usersRouter = require("../controllers/users");

router.use("/users", usersRouter);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
  next();
});

module.exports = router;
