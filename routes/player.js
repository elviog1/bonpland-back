var express = require('express');
var router = express.Router();

const {getAllPlayer,createPlayer, getOnePlayer, deletePlayer, updatePlayer} = require("../controllers/playerControllers")

router.post("/",createPlayer)
router.get("/",getAllPlayer)
router.get("/:id",getOnePlayer)
router.delete("/:id",deletePlayer)
router.put("/:id",updatePlayer)

module.exports = router