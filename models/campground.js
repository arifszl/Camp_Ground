import mongoose from "mongoose";


const CampgroundSchema= new mongoose.Schema({
    title:String,
    price:String,
    description:String,
    location:String
})







export const Campground=mongoose.model('Campground',CampgroundSchema)

