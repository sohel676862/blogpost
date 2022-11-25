const { Schema, model } = require("mongoose");
let articalSchema = new Schema({
    adminId: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
        ,

    },
    image:{
        type:String,
        required:true
    },
    tag: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tag_slug: {
        type: String,
        required: true
    },
    category_slug: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    artical_Text: {
        type: String,
        required: true
    },
    like_dislike: [
        {
            like_dislike_id: {
                type: String,

            },
            like_or_dislike: {
                type: String,
                default: ""
            }
        }
    ],
    viewer: {
        type: Number,
        default: ""
    },
    viewerIp: [
        {
            ip: {
                type: String,
                required: true
            }
        }
    ]

},

    { timestamps: true });

module.exports = model("artical", articalSchema);