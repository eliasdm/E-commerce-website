const mongoose=require("mongoose")
const Joi = require('joi')
const validator = require('validator')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,'please provide your eamil'],
        lowercase:true,
        validate: [validator.isEmail,'please provide a valide email']
      
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})


const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(100).required(),
  });

  return schema.validate(user);
}

exports.UserModel = User; 
exports.validateUser = validateUser;