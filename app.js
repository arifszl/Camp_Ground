
// import {} from 'dotenv/config'
import  express from "express";
import bodyParser  from "body-parser";
import mongoose from "mongoose";
import {Campground} from "./models/campground.js";
import  methodOverride from "method-override";
import engine from 'ejs-mate';
import CatchAsync from "./utils/CatchAsync.js";
import ExpressError from "./utils/ExpressError.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import path from "path";
import dotenv from "dotenv";
/* config */
dotenv.config();

import motelRouter from "./routes/motel.js"
import reviewRouter from './routes/review.js'

const app=express();
//use method override to use patch and delete request 

app.engine('ejs',engine)

app.use(methodOverride("_method"));



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use('public',express.static(path.join(__dirname,'public')));
app.set("view engine","ejs")
app.set('views',path.join(__dirname,'views'))

app.use(motelRouter)
app.use(reviewRouter)



// if I use prefix then i have to include it in my routers
// app.use('/motel',motelRouter)
// then i have to use '/motel/home', '/motel/edit'




// Server and data-base connection

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);




const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})


// app.all('*',(req,res,next)=>{
//     next(new ExpressError('Page Not Found',404))
// })

// app.use((err,req,res,next)=>{
//  res.send('something went wrong')
// })




app.listen(3000,()=>{
    console.log("listening at 3000")
})