const express = require('express')
const router = express.Router()

const {createGame, deleteGame, allGames} = require('../controllers/gameControllers')

router.get('/',allGames)
router.post('/',createGame)
router.delete('/:id',deleteGame)


module.exports = router