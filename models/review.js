import mongoose from "mongoose";
const {Schema}= mongoose;



const reviewSchema=new Schema({
    body:String,
    rating:String
})

export const Review=mongoose.model('Review',reviewSchema)