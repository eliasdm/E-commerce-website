const { sendMail } = require("../utils/mailer");
const PasswordResetToken = require("../models/passwordResetToken");
const { UserModel,validateUser }= require("../models/user");
const bcrypt=require('bcrypt');
const { generateToken } = require("../utils/generateToken");

exports.signup=async(req,res)=>{

    const { error } = validateUser(req.body); //validate user ipute befor check to DB
    if (error) return res.status(400).send(error.details[0].message);
  
    try {
        const user=await UserModel.findOne({email:req.body.email})
        
        if(user){
            return res.status(400).json({"message":"User already exists"})
        }

        const hashedPassword=await bcrypt.hash(req.body.password,10)
        req.body.password=hashedPassword

        const newUser=new UserModel(req.body)
        await newUser.save()


        // generating jwt token
        const token=generateToken(newUser)

        // sending jwt token in the response cookies
        res.cookie('token',token,{
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })

        res.status(201).json({"message":"user has successfully registered!"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured during signup, please try again later"})
    }
}

exports.login=async(req,res)=>{
    try {
        const user=await UserModel.findOne({email:req.body.email})

        if(user && (await bcrypt.compare(req.body.password,user.password))){

            // generating jwt token
            const token=generateToken(user)

            // sending jwt token in the response cookies
            res.cookie('token',token,{
                sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
                maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
                httpOnly:true,
                secure:process.env.PRODUCTION==='true'?true:false
            })
            return res.status(200).json(user)
        }

        res.clearCookie('token');
        return res.status(404).json({message:"Invalid Credentails"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Some error occured while logging in, please try again later'})
    }
}

exports.forgotPassword=async(req,res)=>{
    let newToken;
    try {
        const user=await UserModel.findOne({email:req.body.email})

        if(!user){
            return res.status(404).json({message:"Provided email does not exists"})
        }

        await PasswordResetToken.deleteMany({user:user._id})

        const passwordResetToken=generateToken(user,true)

        // hashes the token
        const hashedToken=await bcrypt.hash(passwordResetToken,10)

        // saves hashed token in passwordResetToken collection
        newToken=new PasswordResetToken({user:user._id,token:hashedToken,expiresAt:Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME)})
        await newToken.save()

        // sends the password reset link to the user's mail
        await sendMail(user.email,'Password Reset Link for Your e-commerce website',
            `<p>Dear ${user.name},

        We received a request to reset the password for your e-commerce website account. If you initiated this request,
         please use the following link to reset your password:</p>
        
        <p><a href=${process.env.ORIGIN}/reset-password/${user._id}/${passwordResetToken} target="_blank">Reset Password</a></p>
        
        <p>This link is valid for a limited time. If you did not request a password reset, please ignore this email.         
        Thank you,
        The  E-WEB developer:  <b> [ Elias ] </b> </p>`)

        res.status(200).json({message:`Password Reset link sent to ${user.email}`})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error occured while sending password reset mail'})
    }
}

exports.resetPassword=async(req,res)=>{
    try {

        const user=await UserModel.findById(req.body.userId)

        if(!user){
            return res.status(404).json({message:"User does not exists"})
        }

        const resetToken=await PasswordResetToken.findOne({user:user._id})

        if(!resetToken){
            return res.status(404).json({message:"Reset Link is Not Valid..."})
        }

        // if the token has expired then deletes the token, 
        if(resetToken.expiresAt < new Date().toISOString()){
          //  await PasswordResetToken.findByIdAndDelete(isResetTokenExisting._id)
            return res.status(404).json({message:"Reset Link has been expired"})
        }

        // check if token satisfies three condition, 
        if(resetToken && resetToken.expiresAt > new Date()
             && (await bcrypt.compare(req.body.token,resetToken.token))){

            await PasswordResetToken.findByIdAndDelete(resetToken._id)

            // resets the password after hashing it
            await UserModel.findByIdAndUpdate(user._id,{password:await bcrypt.hash(req.body.password,10)})
            return res.status(200).json({message:"Password Updated Successfuly"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured while resetting the password"})
    }
}

exports.logout=async(req,res)=>{
    try {
        res.cookie('token',{
            maxAge: new Date(0),
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })
        res.status(200).json({message:'Logout successfully'})
    } catch (error) {
        console.log(error);
    }
}

exports.checkAuth=async(req,res)=>{
    try {
        if(req.user){
            const user=await UserModel.findById(req.user._id)
            return res.status(200).json(user)
        }
        res.sendStatus(401)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}