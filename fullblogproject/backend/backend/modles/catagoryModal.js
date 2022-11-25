const { Schema, model } = require("mongoose");
const categoriSchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
        },
        catagoriSlug:{
            type: String,
            required: true,
        },
        catagoridescription:{
            type: String,
            required: true,
        }
        
    },
    { timeseries: true }
);
module.exports = model("categoty", categoriSchema);
