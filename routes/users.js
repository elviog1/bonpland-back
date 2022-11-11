var express = require('express');
const passport = require('../config/passport');
var router = express.Router();
const {getAll,userSignUp, userSignIn, userSignOut, getOneUser, verifyMail, verifyToken, userSignUpGreener} = require("../controllers/userControllers")

router.get("/", getAll)
router.get("/:id", getOneUser)
router.post("/signup", userSignUp)
router.post("/signupgreener", userSignUpGreener)
router.post("/signin", userSignIn)
router.post("/signout/:email", userSignOut)

router.get("/verified/:code", verifyMail)
router.post("/verifyToken",passport.authenticate("jwt",{session:false}), verifyToken)


module.exports = router;
