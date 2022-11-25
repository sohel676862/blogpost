
const { tagandcategoryData, addArticalData, get_artical_data, get_artical_edit_data, update_artical_Data, delete_artical } = require("../../controlars/deshbor/articalControlar");
const { admin_middlewar } = require("../../meddilwar/admin_middilwar");

const router = require("express").Router();

router.get('/get_tag__category_data', tagandcategoryData);
router.post("/add_artical_data",admin_middlewar,addArticalData);
router.get("/get_artical_Data",admin_middlewar,get_artical_data);
router.get("/get_artical_edit_Data/:slug",get_artical_edit_data);
router.post("/post_artical_update_Data/:id",update_artical_Data);
router.delete("/delet_artical_data_Data/:id",delete_artical);
module.exports = router