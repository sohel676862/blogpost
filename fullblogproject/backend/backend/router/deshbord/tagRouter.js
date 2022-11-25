const { tag_add, get_tag_data, delete_teg, edit_tag, update_tag } = require("../../controlars/deshbor/tagControllar");

const router=require("express").Router();

router.post("/tagadd",tag_add);
router.get("/gettagdata",get_tag_data)
router.delete('/deleteTag/:tegId',delete_teg)
router.get('/edit_Tag/:currentslug',edit_tag)
router.patch('/update_Tag/:updateId',update_tag)
module.exports=router