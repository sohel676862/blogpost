const { comment_post_data, get_comment_post, reply_post, commnet_delete_main_user, reply_commnet_delete} = require("../../controlars/homeControlar/commnetpostControl");
const { view_count } = require("../../controlars/homeControlar/useviesCountAction");
const { auth_user } = require("../../meddilwar/admin_middilwar");

const router = require("express").Router();
router.post("/commont_post",auth_user,comment_post_data)
router.get("/commont_post/:articleId",get_comment_post)
router.put("/commont_reply_post",reply_post)
router.post("/commont_delete_main_user",commnet_delete_main_user);
router.post("/reply_commont_delete",reply_commnet_delete)
router.get("/view_count",view_count)
module.exports =router