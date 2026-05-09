
const User = require("../models/user");
const passport = require("passport");


module.exports.signupForm =  (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.userSignup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err)
            }

            req.flash("success", "you are logged in");
            res.redirect("/listings");

        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs")
}

module.exports.userLogin = async (req, res) => {
        req.flash("success", "Welcome to Wanderlust!!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl)


    }

module.exports.userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings")
    })
}