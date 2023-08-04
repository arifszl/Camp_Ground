import express from "express";
import User from "../models/user.js";
import passport from "passport";
import {
  getRegisterController,
  postRegisterController,
  getLogin,
  postLogin,
  getLogout,
} from "../controller/user.js";

const Router = express.Router();

Router.get("/register", getRegisterController);
Router.get("/login", getLogin);

Router.post("/register", postRegisterController);
Router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
  postLogin,
);
Router.get("/logout", getLogout);
export default Router;
