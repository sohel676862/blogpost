const validator = require("validator")

module.exports.validators = (fields, files) => {

    let { username, password, email, confarmpassword } = fields;
    let error = {

    }
    // console.log(error)
    if (!username) {
        error.username = "please provide your name"
        console.log("true")
    }
    if (!email) {
        error.email = "plase provide your email"
    }
    if (email && !validator.isEmail(email)) {
        error.email = "please provide valid email"
    }
    if (!password) {
        error.password = "plase provide your password"
    }
    if (password !== confarmpassword && password.length > 0) {
        error.confarmpassword = "password dont match"
    }
    if (Object.keys(files).length === 0) {
        error.image = "plase provide your image"
    }
   
    if (Object.keys(error).length === 0) {
        return {
            validation: true
        }
    }

    else {
        return {
            error: {
                validation: false,
                error: error
            }
        }
    }

}