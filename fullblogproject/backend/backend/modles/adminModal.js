const { Schema, model } = require("mongoose");
const adminSchema = new Schema(
    {
        adminName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timeserice: true }
);
module.exports = model("Sohel", adminSchema);
