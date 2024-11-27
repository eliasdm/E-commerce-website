const express=require("express")
const categoryController=require("../controllers/catagory")
const router=express.Router()

router
    .get("/",categoryController.getAll)
    .post("/",categoryController.create)
    .delete("/:id",categoryController.delete)
    .post("/:id",categoryController.update)
    
module.exports=router