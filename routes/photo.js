var express = require('express');
var router = express.Router();

const {createPhoto, getAllPhoto} = require("../controllers/photoControllers")

router.post("/",createPhoto)
router.get("/",getAllPhoto)

module.exports = router