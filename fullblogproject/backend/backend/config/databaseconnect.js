const mongoose = require('mongoose');
module.exports=dbConnect=async()=>{
    try {
      mongoose.connect('mongodb://localhost:27017/blogpostblogpost', {useNewUrlParser: true, useUnifiedTopology: true});
      console.log("data base is connected")
    } catch (error) {
        console.log(error)
    }
}