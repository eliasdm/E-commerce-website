const express=require('express')
const router=express.Router()

const {
       create,
       getByUserId,
       updateById,
       deleteById,
       deleteByUserId  }=require('../controllers/cart')



router
    .post("/",create)
    .get("/user/:id",getByUserId)
    .patch("/:id",updateById)
    .delete("/:id",deleteById)
    .delete("/user/:id",deleteByUserId)

module.exports=router