const express = require('express')
const router = express.Router()

const {createNotice,getAllNotice,deleteNotice} = require('../controllers/noticeControllers')

router.get('/',getAllNotice)
router.post('/',createNotice)
router.delete('/:id',deleteNotice)

module.exports = router