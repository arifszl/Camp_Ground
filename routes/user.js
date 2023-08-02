import express from "express";
import User from "../models/user.js";

const Router = express.Router();

Router.get("/register", (req, res) => {
  res.render("register");
});

Router.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email: email, username: username });
    const registerdUser = await User.register(user, password);
    console.log(registerdUser);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

export default Router;
