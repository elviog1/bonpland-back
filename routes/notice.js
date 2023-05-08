const express = require('express')
const router = express.Router()

const {createNotice,getAllNotice} = require('../controllers/noticeControllers')

router.get('/',getAllNotice)
router.post('/',createNotice)

module.exports = router