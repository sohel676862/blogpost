const {model,Schema}=require("mongoose")
const notificationScema=new Schema({

    useerId:{
        type:String,
        required:true

    },
    articleId:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"unseen"
    }

})

module.exports=model("notication",notificationScema)