const express = require('express')
const router = express.Router()
const {admin_login, registerData, email_verifaid, use_login}=require("../controlars/authControllar")
router.post("/admin",admin_login)
router.post("/register_data",registerData)
router.post("/email_verifaid",email_verifaid)
router.post("/user_login_api",use_login)




module.exports=router