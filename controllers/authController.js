exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false
  });
};


exports.getpost = (req, res, next) => {
  console.log(req.body);
  res.cookie('isLoggedIn', true);
  res.redirect('/')
};