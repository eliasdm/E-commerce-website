require('dotenv').config()
const jwt=require('jsonwebtoken')
const passwordResetToken = require('../models/passwordResetToken')

exports.generateToken=(user,passwordReset=false)=>{

    const payload = {_id:user._id,email:user.email,isAdmin:user.isAdmin}

    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:passwordReset? process.env.PASSWORD_RESET_TOKEN_EXPIRATION:process.env.LOGIN_TOKEN_EXPIRATION})
}

