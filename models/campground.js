import mongoose from "mongoose";
import { Review } from "./review.js";
// const {Schema}= mongoose;

const CampgroundSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

//It is a mongo middleware which is turned on when findbyIDandDelete hits..on campground schema

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.review,
      },
    });
  }
});

const Campground = mongoose.model("Campground", CampgroundSchema);
export default Campground;
