const express=require('express')
const router=express.Router()

const  {
        create,
        getAll,
        getByUserId,
        updateById  } = require("../controllers/order")


router
    .post("/",create)
    .get("/",getAll)
    .get("/user/:id",getByUserId)
    .patch("/:id",updateById)


module.exports=router