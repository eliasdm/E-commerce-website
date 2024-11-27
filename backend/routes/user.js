const express=require("express")
const router=express.Router()
const authToken  = require('../middlewares/auth')


const {
        getAllUser,
        getUser,
        updateUser,
        deleteUser }=require("../controllers/user")

        
router
     .get("/",getAllUser)
    .get("/u",authToken,getUser)
    .patch("/:id",updateUser)
    .delete('/:id',deleteUser);


module.exports=router