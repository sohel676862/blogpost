
let jwt = require("jsonwebtoken");
module.exports.admin_middlewar = async (req, res, next) => {
    let { blog_post } = req.cookies
    if (!blog_post) {
        res.status(409).json({ errormessage: { error: "admin log in first" } })
    }
    else {

        let jwttokenDecode = await jwt.verify(blog_post, 'shhhhh')
        // console.log(jwttokenDecode)
        req.adminName = jwttokenDecode.adminName;
        req.id = jwttokenDecode.id;
        req.role = jwttokenDecode.role

        next()
    }
};

module.exports.auth_user = async (req, res, next) => {
    let { login_token } = req.cookies;
 
    if (!login_token) {
        // res.status(404).json({
        //     user_login_error:"plase login frist then link and commend"
        // })
        req.userId = "";
        req.role = ""
        req.username = ""
        next()
    }
    else {
        let jwttokenDecode = await jwt.verify(login_token, 'shhhhh');
        req.userId = jwttokenDecode.userId;
        req.username = jwttokenDecode.username;
        req.loginMethod = jwttokenDecode.loginMethod;
        req.role = jwttokenDecode.role

        next()
    }


}

module.exports.auth_user_like_dislike = async (req, res, next) => {
    let { login_token } = req.cookies;
    if (!login_token) {
        res.status(404).json({
            error: "plese login first"
        })
    }
    else {
        let jwttokenDecode = await jwt.verify(login_token, 'shhhhh');
        // console.log(jwttokenDecode)
        if (jwttokenDecode.role === "user" && jwttokenDecode.assessState === 'unblock') {
            req.userId = jwttokenDecode.userId;
            req.username = jwttokenDecode.username;
            req.loginMethod = jwttokenDecode.loginMethod;
            req.role = jwttokenDecode.role;
            next()

        }
        else {

            res.status(404).json({
                messege: "you can not get assess"
            })
        }

    }

}

