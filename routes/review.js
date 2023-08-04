import express from "express";
import {
  reviewController,
  deleteReviewController,
} from "../controller/review.js";
import { isLogin } from "../middleware.js";
const Router = express.Router();

Router.post("/show/:id/review", isLogin, reviewController);
Router.delete("/show/:id/review/:reviewId", deleteReviewController);

export default Router;
