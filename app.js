
// import {} from 'dotenv/config'
import  express from "express";
import bodyParser  from "body-parser";
import mongoose from "mongoose";
import {Campground} from "./models/campground.js";
import  methodOverride from "method-override";
import engine from 'ejs-mate';



import dotenv from "dotenv";
/* config */
dotenv.config();

import motelRouter from "./routes/motel.js"

const app=express();
//use method override to use patch and delete request 

app.engine('ejs',engine)

app.use(methodOverride("_method"));



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine","ejs")

app.use(motelRouter)








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


app.listen(3000,()=>{
    console.log("listening at 3000")
})