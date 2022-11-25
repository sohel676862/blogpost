const { home_artical, tag_article_data, new_old_data, get_tag_category_all_data, get_tag_all_data, artical_ditails, artical_like_dislike, user_artical_like, user_dislike } = require("../../controlars/homeControlar/homearticalControlar");
const { auth_user, auth_user_like_dislike } = require("../../meddilwar/admin_middilwar");

const router = require("express").Router();

router.get("/get_home_Article_data",home_artical)
router.get("/get_tag_Article_data",tag_article_data)
router.get("/get_new_old_data",new_old_data)
router.get("/get_tag_category_all_data",get_tag_category_all_data)
router.get("/get_tag_all_data",get_tag_all_data) 
router.get("/get_details_article/:slug",artical_ditails)
router.get("/article_like_diselike/:slug",auth_user,artical_like_dislike)
router.put("/user_artical_like",auth_user_like_dislike, user_artical_like);
router.put("/user_artical_dislike",auth_user_like_dislike,user_dislike)
module.exports = router;
 