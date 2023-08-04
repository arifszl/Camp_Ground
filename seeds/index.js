import mongoose from "mongoose";
import Campground from "../models/campground.js";
import { places, descriptors } from "./seedHelper.js";
import dotenv from "dotenv";

// configure dotenv
dotenv.config({ path: "../.env" });

import { cities } from "./cities.js";

// mongoose.connect(
//     process.env.MONGODB_URI,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );

// const db=mongoose.connection;
// db.on("error",console.error.bind(console,"connection error:"));
// db.once("open",()=>{
//     console.log("Database connected");
// })

mongoose.connect("mongodb://0.0.0.0:27017/yelp-camp", {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "64cc792bdbdec0913ee60770",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image:
        "https://content.skyscnr.com/m/4bb6095d0dbb56fd/original/Motel-Nacht.jpg?resize=1800px:1800px&quality=100",
      description:
        "When you are looking for property amenities and a comfortable vacation, hotels feature more luxurious accommodations, fast WiFi, room service, fitness centers, spas and more.  If you are traveling to an area you are not familiar with, hotels tend to have more staff like receptionists and concierges who can assist you in planning activities or provide local information. Convenience can be important, and hotels are usually found in desirable locations, such as close to popular attractions.  Business travelers attending a conference may prefer a hotel’s amenities, like room service or a sit-down restaurant, so they can have a hassle-free schedule. ",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
