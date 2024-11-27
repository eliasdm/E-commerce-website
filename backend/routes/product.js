const express=require('express')
const router=express.Router()

const {
        create,
        getAll,
        getById,
        updateById,
        deleteById  }  =  require("../controllers/Product")


router
    .post("/",create)
    .get("/",getAll)
    .get("/:id",getById)
    .patch("/:id",updateById)
    .delete("/:id",deleteById)

module.exports=router