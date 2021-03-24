function authController() {
  return {
    doLogin: (req, res) => {
      res.render("auth/login");
    },
    doRegister: (req, res) => {
      res.render("auth/register")
    }
  };
}

module.exports = authController;
