import { Review } from "../models/review.js";
import Campground from "../models/campground.js";

import ExpressError from "../utils/ExpressError.js";
import CatchAsync from "../utils/CatchAsync.js";

export const homeController = async (req, res) => {
  const motels = await Campground.find({});
  res.render("home", { motels });
};

export const addMotelController = (req, res) => {
  res.render("addMotel");
};

export const addMotelPostController = async (req, res, next) => {
  try {
    const { name, price, description, location } = req.body;

    const motel = await new Campground({
      title: name,
      price: price,
      description: description,
      location: location,
    }).save();
    req.flash("success", " Successfully Created Farm");
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

export const showController = async (req, res) => {
  const id = req.params.id;
  const motel = await Campground.findById(id).populate("review");

  res.render("show", { motel, id });
};

export const editController = async (req, res) => {
  const id = req.params.id;
  const motel = await Campground.findById(id);

  res.render("edit", { motel });
};

export const editPostController = async (req, res) => {
  const id = req.params.id;
  const { name, location, price, description } = req.body;
  const motel = await Campground.findByIdAndUpdate(id, {
    title: name,
    location: location,
    price: price,
    description: description,
  });
  res.redirect("/");
};

export const deleteController = async (req, res) => {
  const id = req.params.id;
  const a = await Campground.findByIdAndDelete(id);
  console.log(`Deleted motel with id ${id}`);
  res.redirect("/");
};
