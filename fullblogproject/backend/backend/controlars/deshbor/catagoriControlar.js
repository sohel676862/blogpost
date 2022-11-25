const categoriSchema = require("../../modles/catagoryModal")
module.exports.catagori_add = async (req, res) => {
    let { catagoriname, catagoridescription } = req.body
    // console.log({ catagoridescription, catagoriname })

    let error = {}
    if (!catagoriname) {
        error.catagoriname = "please provide your catagori"
    }
    if (!catagoridescription) {
        error.catagoridescription = "please provide your description"
    }

    if (Object.keys(error).length === 0) {


        let catagoriSlug = catagoriname.trim().split(" ").join('-')

        let checkcatagory = await categoriSchema.findOne({ catagoriSlug })
        if (checkcatagory) {
            res.status(409).json({ error: { error: "name alroady taken" } })
        }
        else {
            try {
                let catagoriObject = {
                    categoryName: catagoriname.trim(),
                    catagoridescription,
                    catagoriSlug

                }
                await categoriSchema.create({
                    categoryName: catagoriname.trim(),
                    catagoridescription,
                    catagoriSlug
                })
                res.status(202).json({ message: { message: "data is added in categorylist" }, catagoriObject })
                // console.log(catagoriObject)
            } catch (error) {
                res.status(500).json({ error: { error: "enternal server error" } })
            }
        }

    }
    else {
        // console.log(error)
        res.status(404).json({ error })
    }
}

module.exports.get_getegory = async (req, res) => {
    let parPage = 4;

    let { page, searchValue } = req.query
    let parseNumber = parseInt(page)
    let skipPage = (parseNumber - 1) * 2
    console.log({ skipPage, parseNumber, page })
    // console.log({ searchValue })
    // let getcatagorydata = await categoriSchema.find({}).countDocuments()
    // console.log(getcatagorydata)
    if (searchValue === 'undefined' || !searchValue) {
        try {
            let getcatagoryCount = await categoriSchema.find({}).countDocuments()
            let getCategory = await categoriSchema.find({}).skip(skipPage).limit(parPage).sort({})
            console.log(getCategory)
            res.status(200).json({ getCategory: getCategory, getcatagoryCount, parPage })
        } catch (error) {
            res.send("data is not send")
            console.log(error)
        }
    }
    else {
        try {
            let getcatagoryCount = await categoriSchema.find({}).countDocuments()
            let getCategory = await categoriSchema.find({});
            let getCategoryfilte = getCategory.filter(c => c.categoryName.toUpperCase().indexOf(searchValue.toUpperCase()))
            // console.log(getCategoryfilte)
            // console.log(getCategory)
            res.status(200).json({ getCategory: getCategory, getcatagoryCount, parPage })
        } catch (error) {
            res.send("data is not send")
            res.status(500).join(" inter null server error")
            // console.log(error)
        }

    }

}
module.exports.delete_gategory = async (req, res) => {
    const getId = req.params.categoryid
    try {

        let deletecategoty = await categoriSchema.findByIdAndDelete(getId)
        // console.log(deletecategoty);
        res.status(200).json({ deletecategoty, message: "category delete from data" })
    } catch (error) {
        res.status(404).json({ error: "enternal servar error" })
    }
}
module.exports.catagori_edit = async (req, res) => {
    const catagoriSlug = req.params.categoriSlug;

    try {
        let edit_gategory = await categoriSchema.findOne({ catagoriSlug })
        console.log(edit_gategory)
        res.status(200).json({ edit_gategory })

    } catch (error) {
        res.status(400).json({ edit_gategory })
    }
}
module.exports.category_update = async (req, res) => {
    let id = req.params.id
    // console.log(id)
    let { categoriName, categoriDes } = req.body
    console.log({ categoriName, categoriDes: categoriDes })

    /////////
    let error = {}
    if (!categoriName) {
        error.catagoriname = "please provide your catagori"
    }
    if (!categoriDes) {
        error.categoriDes = "please provide your description"
    }

    if (Object.keys(error).length === 0) {


        let catagoriSlug = categoriName.trim().split(" ").join('-')
        try {
            let updatecategory = await categoriSchema.findByIdAndUpdate(id, {
                categoryName: categoriName.trim(),
                catagoridescription: categoriDes,
                catagoriSlug: catagoriSlug
            })
            // console.log(updatecategory)
            res.status(200).json("catagory updte success")
        } catch (error) {
            console.log(error)
            res.status(404).json("inter server error")
        }


    }
    else {
        console.log({ error })
        res.status(404).json({ error })
    }
}