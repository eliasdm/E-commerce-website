const express=require("express")
const brandController=require("../controllers/brand")
const router=express.Router()

router
    .get("/",brandController.getAll)
    .post("/",brandController.create)
    .delete("/:id",brandController.delete)
    .post("/:id",brandController.update)

module.exports=router