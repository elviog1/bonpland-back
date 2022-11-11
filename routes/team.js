var express = require('express');
var router = express.Router();

const {createTeam, getAllTeam} = require("../controllers/teamControllers")

router.post("/",createTeam)
router.get("/",getAllTeam)

module.exports = router