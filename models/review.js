import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  body: String,
  rating: String,

  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Review = mongoose.model("Review", reviewSchema);
