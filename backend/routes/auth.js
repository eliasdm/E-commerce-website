const express=require('express')
const router=express.Router()
const authController= require("../controllers/auth")
const authMiddleware  = require('../middlewares/auth')

router
    .post("/signup",authController.signup)
    .post('/login',authController.login)
    .post("/forgot-password",authController.forgotPassword)
    .post("/reset-password",authController.resetPassword)
    .get("/check-auth", authMiddleware,  authController.checkAuth)
    .get('/logout',authController.logout)

module.exports=router