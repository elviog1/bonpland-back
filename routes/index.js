var express = require('express');
var router = express.Router();
const userRouter = require("./users")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({title: "holi"})
});

router.use("/auth", userRouter) 

module.exports = router;
