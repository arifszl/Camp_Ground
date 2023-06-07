import {Campground}  from '../models/campground.js'
import {Review}  from '../models/review.js'
import bodyParser  from 'body-parser';



export const reviewController=async (req,res)=>{
    const rating=req.body.rating;
    const body=req.body.body;
    const campId=req.params.id;
    const campground=await Campground.findById(campId);
     const review= new Review({ body:body,rating:rating})
     campground.review.push(review);
     await review.save();
     await campground.save();
    res.redirect(`/show/${campId}`)
  }

  export const deleteReviewController=async (req,res)=>{
    const {id,reviewId}=req.params;
     await Campground.findByIdAndUpdate(id,{$pull:{review:reviewId}});
     await Review.findByIdAndDelete(reviewId);
res.redirect(`/show/${id}`);


  }