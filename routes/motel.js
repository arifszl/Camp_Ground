import express from "express";
import { homeController } from "../controller/motel.js";
import {
  addMotelController,
  addMotelPostController,
  showController,
  editController,
  deleteController,
  editPostController,
} from "../controller/motel.js";
import { isLogin, isAuthor } from "../middleware.js";
// import * as motelController from "../controller/motel.js"

let Router = express.Router();

Router.get("/", homeController);
Router.get("/addMotel", isLogin, addMotelController);
Router.get("/show/:id", showController);
Router.get("/edit/:id", isLogin, isAuthor, editController);

// import methodOverride from "method-override"; in app.js file
Router.patch("/edit/:id", isLogin, isAuthor, editPostController);
Router.post("/addMotel", isLogin, addMotelPostController);
Router.delete("/delete/:id", isLogin, isAuthor, deleteController);

export default Router;
