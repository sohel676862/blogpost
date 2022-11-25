// var validator = require('validator');
const axios = require("axios");
const formidable = require("formidable");
const express = require("express");
const userSchema = require("../modles/userModal");
var nodemailer = require("nodemailer");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcrypt");
const adminSchema = require("../modles/adminModal");
const { validators } = require("../validation/registerValidation");
const validator = require("validator");
const fs = require("fs");
var jwt = require("jsonwebtoken");
const { json } = require("body-parser");
module.exports.admin_login = async (req, res) => {
    let { email, password } = req.body;
    const error = {};

    if (email && !validator.isEmail(email)) {
        error.email = "please provide your valid email";
    }
    if (!email) {
        error.email = "please provide your  email";
    }
    if (!password) {
        error.password = "please provide your  password";
    }
    if (Object.keys(error).length > 0) {
        console.log({ error });

        return res.status(404).json({ error: error, status: 201 });
    } else {
        try {
            let getadmin = await adminSchema.findOne({ email }).select("+password");
            console.log(getadmin);
            if (getadmin) {
                let matchPassword = await bcrypt.compare(password, getadmin.password);
                if (matchPassword) {
                    var token = jwt.sign(
                        {
                            id: getadmin.id,
                            adminName: getadmin.adminName,
                            email: getadmin.email,
                            role: getadmin.role,
                        },
                        "shhhhh",
                        { expiresIn: "7d" }
                    );

                    res.cookie("blog_post", token, { httpOnly: true });
                    res.status(200).json({ success: "sussecc", token });

                    console.log("data send success");
                } else {
                    return res
                        .status(404)
                        .json({ error: { password: "password does't exit" } });
                }
            } else {
                return res.status(404).json({ error: { email: "email does't exit" } });
            }
        } catch (error) {
            return res
                .status(404)
                .json({ error: { error: "enternar server error" } });
        }
    }
};

module.exports.registerData = async (req, res) => {
    let formData = formidable();
    formData.parse(req, async (err, fields, files) => {
        let { username, password, email, confarmpassword } = fields;
        // console.log({username,password,email})
        if (err) {
            console.log(err);
        } else {
            let validationdata = validators(fields, files);
            if (validationdata.validation) {
                try {
                    let getUser = await userSchema.findOne({ email });
                    // console.log(getUser)
                    if (getUser) {
                        res.status(404).json({
                            checkemail:
                                "you have alrady a account please try another valid email aders",
                        });
                    } else {
                        let otp = Math.floor(Math.random() * 1000000 + 2345678);
                        var transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "sohelahmed.6862@gmail.com",
                                pass: "fkmdtcdbyddlkjyw",
                            },
                        });
                        const mailOptions = {
                            from: "sohelahmed.6862@gmail.com", // sender address
                            to: email, // list of receivers
                            subject: "Subject of your email", // Subject line
                            html: ` <div style={padding:"10px}>
                            <h3>
                            Hi ${username},

                            Thanks for visiting our e-commer site...

                            
                            As a special thank you, we’re giving you 15% off if you sign up our new ecommers website.
                            
                            Simply use the coupon below at the checkout <span style={color:green}> ${otp}</span>.</h3>
                            </div> `,
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                                res.status(500).json({
                                    otperror: "server error plese try again",
                                });
                            } else {
                                let emailVarifiedbyOtp = jwt.sign(
                                    {
                                        email,
                                        username,
                                        password,
                                        imageInfo: files,
                                        otp: otp,
                                    },
                                    "shhhhh"
                                );

                                const timeOption = {
                                    expires: new Date(Date.now() + 20 * 60 * 1000),
                                };
                                res
                                    .status(201)
                                    .cookie("emailVarifiedtoken", emailVarifiedbyOtp, timeOption)
                                    .json({
                                        sendOtp: "please provide your otp",
                                    });
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                    res.status(204).json({ servererror: "internal server error" });
                }
            } else {
                res.status(404).json({
                    errorMessege: validationdata.error.error,
                });
                // console.log(validationdata);
            }
        }
    });
};

module.exports.email_verifaid = async (req, res) => {
    let { otpCode } = req.body;
    console.log(otpCode);
    let { emailVarifiedtoken } = req.cookies;
    if (!otpCode) {
        res.status(400).json({ tokenfail: "please plase provise your otp code" });
    } else {
        if (!emailVarifiedtoken) {
            res
                .status(400)
                .json({ tokenfail: "your time is over please send conde again" });
        } else {
            let { email, username, password, imageInfo, otp } = await jwt.verify(
                emailVarifiedtoken,
                "shhhhh"
            );
            // console.log({ email, username, password, imageInfo, otp })
            let updatename = Date.now() + imageInfo.image.originalFilename;
            let imagePth = __dirname + `../../allimage/${updatename}`;
            try {
                if (parseInt(otpCode) !== otp) {
                    res
                        .status(400)
                        .json({
                            tokenfail: "your code is not valid..please send youe valid code",
                        });
                } else {
                    fs.copyFile(imageInfo.image.filepath, imagePth, async (err) => {
                        if (!err) {
                            let createUser = await userSchema.create({
                                username: username,
                                email,
                                password,
                                image: updatename,
                                loginMethod: "menollay",
                            });
                            let userToken = createtoken(createUser, "shhhhh", "1d")
                            // let userToken = jwt.sign(
                            //     {
                            //         username: createUser.username,
                            //         email: createUser.email,
                            //         password,
                            //         image: createUser.updatename,
                            //         loginMethod: createUser.loginMethod,
                            //         role: createUser.role,
                            //         assessState: createUser.assessState,
                            //         createdAt: createUser.createdAt,
                            //     },
                            //     "shhhhh",
                            //     { expiresIn: "7d" }
                            // );
                            const tokenTime = {
                                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                            };
                            res.clearCookie("emailVarifiedtoken");
                            res.status(201).cookie("userToken", userToken, tokenTime).json({
                                loginSuccess: "data send success",
                                userToken,
                            });
                            // res.send("data is success")
                        } else {
                            console.log({ err });
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};

module.exports.use_login = async (req, res) => {
    let { password, email } = req.body;
    console.log(password);
    let error = {};
    if (!email) {
        error.email = "please provide your login email";
    }
    if (!password) {
        error.password = "please provide your login password";
    }
    if (Object.keys(error).length > 0) {
        res.status(404).json({ error });
    } else {
        try {
            let user_Login = await userSchema.findOne({ email });
            console.log(user_Login)
            if (user_Login) {
                if (password === user_Login.password) {
                    let login_token = createtoken(user_Login, "shhhhh", "1d")
                    // let login_token = jwt.sign(
                    //     {
                    //         username: user_Login.username,
                    //         email: user_Login.email,
                    //         password:user_Login.password,
                    //         image: user_Login.updatename,
                    //         loginMethod: user_Login.loginMethod,
                    //         role: user_Login.role,
                    //         assessState: user_Login.assessState,
                    //         createdAt: user_Login.createdAt,
                    //     },
                    //     "shhhhh",
                    //     { expiresIn: "7d" }
                    // );
                    console.log(login_token)
                    const tokenTime = {
                        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    };

                    res.status(201).cookie("login_token", login_token, tokenTime).json({
                        loginSuccess: "data send success",
                        login_token
                    });
                } else {
                    res.status(404).json({
                        passwordmathchfail: "please proveide your valid pasword",
                    });
                }
            } else {
                res.status(404).json({
                    emailFail: "please proveide your login email",
                });
            }
        } catch (error) {
            console.log(error);
            res.status("404").json({});
        }
    }
};

function createtoken(user_Login, keys, date) {
    let login_token_call = jwt.sign(
        {
            username: user_Login.username,
            email: user_Login.email,
            password: user_Login.password,
            image: user_Login.updatename,
            loginMethod: user_Login.loginMethod,
            role: user_Login.role,
            assessState: user_Login.assessState,
            createdAt: user_Login.createdAt,
            userId:user_Login._id
        },
        keys,
        { expiresIn: date }
    );
    return login_token_call
}