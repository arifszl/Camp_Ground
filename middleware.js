import Campground from "./models/campground.js";

export const isLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    // console.log(req.session);
    req.flash("error", " you are not login ");
    return res.redirect("/login");
  } else {
    next();
  }
};

export const isAuthor = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const camp = await Campground.findById(id);
  console.log(camp.author);
  if (!camp.author.equals(req.user._id)) {
    req.flash("error", "Tu admin nhi hai bey!");
    return res.redirect(`/show/${id}`);
  }
  next();
};
