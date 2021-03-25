const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

function authController() {
  return {
    doLogin: (req, res) => {
      res.render("auth/login");
    },

    postLogin: (req, res, next) => {
      passport.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/",
        failureFlash: true,
      })(req, res, next);
    },

    doRegister: (req, res) => {
      res.render("auth/register");
    },

    postRegister: (req, res) => {
      const { username, email, password } = req.body;
      let errors = [];

      // Checking Required Fields
      if (!username || !email || !password) {
        errors.push({ message: "All Fields are Required" });
      }

      // Checking Password Length
      if (password.length < 6) {
        errors.push({ message: "Password Should Be atleast 6 Charecters" });
      }

      if (errors.length > 0) {
        res.render("auth/register", { errors, username, email, password });
      } else {
        User.findOne({ email: email }).then((user) => {
          if (user) {
            errors.push({ message: "This Email is Already Registered" });
            res.render("auth/register", { errors, username, email, password });
          } else {
            const newUser = new User({ username, email, password });

            // Hash Password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;

                newUser
                  .save()
                  .then((user) => {
                    req.flash(
                      "success_msg",
                      "You are Registered, You Can Login"
                    );
                    res.redirect("/login");
                  })
                  .catch((err) => console.log(err));
              });
            });
          }
        });
      }
    },
  };
}

module.exports = authController;
