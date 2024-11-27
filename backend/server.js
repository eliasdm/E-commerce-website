require("dotenv").config()
const cookieParser=require("cookie-parser")
const cors=require('cors')
const morgan=require("morgan")

const express=require('express')
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")
const productRoutes=require("./routes/product")
const catagoryRoutes=require("./routes/catagory")
const wishlistRoutes=require("./routes/wishList")
const brandRoutes=require("./routes/brand")
const reviewRoutes = require("./routes/review")
const cartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")
const addressRoutes = require("./routes/address")



const { connectToDB } = require("./config/db")



const app=express()
connectToDB()


// middlewares
app.use(cors({origin:process.env.ORIGIN,credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan("tiny"))


// routes
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/catagories",catagoryRoutes)
app.use("/api/brands",brandRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/address",addressRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/wishlists",wishlistRoutes)



const port = process.env.PORT ||5000
app.listen(port,()=>{
    console.log(`server [STARTED] ~ http://localhost:${port}`);
})