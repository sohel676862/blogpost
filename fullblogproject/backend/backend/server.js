const express= require('express')
const dotEnv= require('dotenv')
var bodyParser = require('body-parser')
const app= express()
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json())
var cors = require("cors"); 
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
var validator = require('validator');
const dbConnect=require('./config/databaseconnect')
const authRouter=require('./router/authRouter')
const catagoriRoute=require("./router/deshbord/catagoriRoute")
const tagRouter=require('./router/deshbord/tagRouter');
const articalRouter=require('./router/deshbord/articalRouter')
const homeArticle=require('./router/home/homeArticle')
const homeCommnet=require("./router/home/homeCommnet")
const { application } = require('express');
let converEnv=parseInt(process.env.PORT)

PORT= converEnv|| 4000
console.log(PORT)
///authon router
app.use('/api',authRouter)
app.use('/api',catagoriRoute)
app.use('/api',tagRouter)
app.use('/api',articalRouter)
app.use("/api",homeArticle)
app.use("/api",homeCommnet)
///mongodb
//photo
app.use("/image",express.static("allimage"))
dbConnect()

// app.get("/", (req, res) => {
  
//   return res.status(200).cookie("blog","success",
//   {expires: new Date(Date.now() + 7*60*60*1000),
//     httpOnly:true}).json({
//    message:"success", })
// })

app.listen(PORT,(error)=>{

    if(!error){
        console.log(`listening on port: ${PORT}`)
    }
})