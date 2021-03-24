function authController() {
  return {
    doLogin: (req, res) => {
      res.render("auth/login");
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
        res.send("Validation Passed");
      }
    },
  };
}

module.exports = authController;
