const {model,Schema}= require("mongoose");
let userSchema=new Schema({
     username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      image:{
        type:String,
        required:true
      },
      password: {
        type: String,
        required: true,
      },
      loginMethod:{
        type:String,
        required:true,
      },
      role:{
        type:String,
        default:"user"
      },
      assessState:{
        type:String,
        default:"unblock" 
      }
      
      
},{timestamps:true});

module.exports=model("usemodal",userSchema)

