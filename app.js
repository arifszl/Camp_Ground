// import {} from 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Campground from "./models/campground.js";
import methodOverride from "method-override";
import engine from "ejs-mate";
import path from "path";
import dotenv from "dotenv";
import motelRouter from "./routes/motel.js";
import reviewRouter from "./routes/review.js";
import userRouter from "./routes/user.js";
import User from "./models/user.js";
import { fileURLToPath } from "url";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import { deserialize } from "v8";
import ExpressError from "./utils/ExpressError.js";
import CatchAsync from "./utils/CatchAsync.js";
import flash from "connect-flash";
const { deserializeUser, serializeUser } = passport;

/* config */
dotenv.config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
//use method override to use patch and delete request

app.engine("ejs", engine);

app.use(methodOverride("_method"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionConfig = {
  secret: "thisismysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  next();
});

app.use(motelRouter);
app.use(reviewRouter);
app.use(userRouter);

// if I use prefix then i have to include it in my routers
// app.use('/motel',motelRouter)
// then i have to use '/motel/home', '/motel/edit'

// Server and data-base connection

// mongoose.connect(
//     process.env.MONGODB_URI,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8000, () => {
      console.log("server is live at port 8000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// app.use((err, req, res, next) => {
//   res.render("error", { err });
// });

// app.listen(8000,()=>{
//     console.log("listening at 8000")
// })
