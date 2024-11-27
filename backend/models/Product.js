const mongoose=require("mongoose")
const {Schema} = mongoose

const productSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    thumbnail:{   //url of the image of product 
        type:String,
        required:true,
        default:"http://"
    },
    images:{
        type:[String],
        // required:true
    },
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Product',productSchema)