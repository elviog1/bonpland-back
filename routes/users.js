var express = require('express');
var router = express.Router();
const {getAll,userSignUp, userSignIn, userSignOut, getOneUser} = require("../controllers/userControllers")

router.get("/", getAll)
router.get("/:id", getOneUser)
router.post("/signup", userSignUp)
router.post("/signin", userSignIn)
router.post("/signout/:id", userSignOut)

module.exports = router;
