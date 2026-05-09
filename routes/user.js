const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { signupForm, userSignup, loginForm, userLogin, userLogout } = require("../controller/user");


router.route("/signup")
.get(signupForm)
.post(wrapAsync(userSignup))

router.route("/login")
.get( loginForm)
.post( saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userLogin);

router.route("/login")
.get( loginForm)
.post( saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userLogin);


router.get("/logout", userLogout);

module.exports = router