import express from 'express';
import {reviewController,deleteReviewController} from '../controller/review.js'
const Router=express.Router();


Router.post('/show/:id/review',reviewController)
Router.delete('/show/:id/review/:reviewId',deleteReviewController)

export default Router;