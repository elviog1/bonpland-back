var express = require('express');
var router = express.Router();

const {getAllPlayer,createPlayer, getOnePlayer, deletePlayer} = require("../controllers/playerControllers")

router.post("/",createPlayer)
router.get("/",getAllPlayer)
router.get("/:id",getOnePlayer)
router.delete("/:id",deletePlayer)

module.exports = router