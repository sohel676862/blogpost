const { Schema, model } = require("mongoose");
let commnetSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    articleId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },
    userId:{
        type:String,
        required:true
    },
  
    
    commenttext: {
        type: String,
        required: true
    },
    repliCOmment: [
        {
            replyName: {
                type: String,
                required: true
            },
            replyId: {
                type: String,
                required: true
            },
            replyComment: {
                type: String,
                required: true
            },
            replyTime: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

module.exports = model("commnet", commnetSchema);
