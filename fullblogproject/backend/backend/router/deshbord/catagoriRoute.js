const { catagori_add, get_getegory, delete_gategory, catagori_edit, category_update } = require("../../controlars/deshbor/catagoriControlar");
const { admin_middlewar } = require("../../meddilwar/admin_middilwar");

const router=require("express").Router();

router.post("/add-catagori",admin_middlewar,catagori_add)
router.get("/get_gategory",get_getegory)
router.delete("/delete_gategory/:categoryid",delete_gategory)
router.get("/edit_gategory/:categoriSlug",catagori_edit)
router.patch('/update_gategory/:id',category_update)

module.exports=router