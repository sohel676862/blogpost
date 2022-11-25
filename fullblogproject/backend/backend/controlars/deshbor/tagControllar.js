const tagSchema = require("../../modles/tag_module")
module.exports.tag_add = async (req, res) => {
    let { tageName, tegDes } = req.body;
    let tagSlug = tageName.split(' ').join('-');
    let error = {};
    if (!tageName) {
        error.tageName = "please provide your tagName"
    }
    if (!tegDes) {
        error.tegDes = "plase provide your tgeDes"
    }

    if (Object.keys(error).length <= 0) {
        let slugmessage = await tagSchema.findOne({ tagSlug })
        if (slugmessage) {
            res.status(409).json({ error: { error: "name alroady taken" } })
        }
        else {
            try {

                let uploadTagMongoDb = await tagSchema.create({
                    tageName: tageName.trim(),
                    tegDes: tegDes.trim(),
                    tagSlug: tagSlug
                })
                // console.log(uploadTagMongoDb);
                res.status(200).json({ message: "data add success", uploadTagMongoDb })

            } catch (error) {
                console.log({ error })
                res.status(400).json({ error: "interserver error" })

            }
        }

    }
    else {
        console.log(error)
        res.status(400).json({ error })
    }
}
module.exports.get_tag_data = async (req, res) => {
    let { page, searchvalue } = req.query
    let parPage = 4
    let converPage = parseInt(page);
    let skipPage = (converPage - 1) * 2;

    try {
        let allitemCount = await tagSchema.find({}).countDocuments()
        let getquerydata = await tagSchema.find({}).skip(skipPage).limit(parPage).sort({})
        // console.log({getquerydata})
        res.status(200).json({ allitemCount, getquerydata, parPage })


    } catch (error) {
        console.log(error)
    }
}
module.exports.delete_teg = async (req, res) => {
    let { tegId } = req.params
    try {
        let deleteteg = await tagSchema.findByIdAndDelete(tegId)
        console.log(deleteteg)
        res.status(200).json({ message: "data is delete success" })
    } catch (error) {
        res.status(404).join({ error })
    }

}
module.exports.edit_tag = async (req, res) => {
    let { currentslug } = req.params;

    try {
        let edit_tag_data = await tagSchema.findOne({ currentslug })
        res.status(200).json({ edit_tag_data })
    } catch (error) {
        res.status(error)
    }

}
module.exports.update_tag = async (req, res) => {
    const { updateId } = req.params
    let { tageName, tegDes } = req.body
    let tagSlug = tageName.split(' ').join('-');
    let error = {};
    if (!tageName) {
        error.tageName = "please provide your tagName"
    }
    if (!tegDes) {
        error.tegDes = "plase provide your tgeDes"
    }

    if (Object.keys(error).length <= 0) {
        try {
            let update = await tagSchema.findByIdAndUpdate(updateId, {
                tageName: tageName.trim(),
                tegDes: tegDes.trim(),
                tagSlug
            })

            res.status(200).json({message:"data update success"})
        } catch (error) {
            console.log(error)
            res.status(404).json({error})
        }

    }
    else {
        console.log(error)
        res.status(400).json({ error })
    }
}