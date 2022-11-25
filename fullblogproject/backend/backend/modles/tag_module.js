const { Schema, model } = require("mongoose");

const tagSchema= new Schema({

    tageName:{
        type: String,
        required:true
    },
    tegDes:{
        type: String,
        required:true
    },
    tagSlug:{
        type: String,
        required:true
    }
    
})

module.exports=model("tagmodule",tagSchema)