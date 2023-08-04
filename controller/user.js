import Campground from "../models/campground.js";
import User from "../models/user.js";

export const getRegisterController = (req, res) => {
  res.render("register");
};

export const postRegisterController = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email: email, username: username });
    const registerdUser = await User.register(user, password);

    req.login(registerdUser, (err) => {
      if (err) return next(err);
      req.flash("success", `welcome ${username}`);
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = (req, res) => {
  req.flash("success", "Successfully log in");

  const returnUrl = req.session.returnTo || "/";
  delete req.session.returnTo;

  res.redirect(returnUrl);
};

export const getLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged Out");
    res.redirect("/");
  });
};
