
// import {} from 'dotenv/config'
import  express from "express";
import bodyParser  from "body-parser";
import mongoose from "mongoose";
import {Campground} from "./models/campground.js";
import dotenv from "dotenv";
/* config */
dotenv.config();


const app=express();




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine","ejs")


app.get('/',(req,res)=>{
    res.send("Working properly")
})


app.get("/campground", async (req,res)=>{
    const camp =await new Campground({
           title:'River view',
           price:'12',
           description:'Good',
           location:'Delhi'
    }).save();
    console.log(camp)
})





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