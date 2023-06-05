import  express from "express"
import {addMotelController,addMotelPostController,
    showController,editController,deleteController, 
    editPostController,homeController} 
    from "../controller/motel.js"
// import * as motelController from "../controller/motel.js"

let Router = express.Router()

Router.get("/",homeController)
Router.get("/addMotel",addMotelController)
Router.get('/show/:id',showController)
Router.get('/edit/:id',editController)


// import methodOverride from "method-override"; in app.js file
Router.patch('/edit/:id',editPostController)
Router.post('/addMotel',addMotelPostController)
Router.delete("/delete/:id",deleteController)

export default Router;