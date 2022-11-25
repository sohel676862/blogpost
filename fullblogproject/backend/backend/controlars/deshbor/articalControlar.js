const tagSchema = require('../../modles/tag_module')
const categoriSchema = require('../../modles/catagoryModal')
const formidable = require('formidable');
const { articalvalidetor } = require('../../validation/articalValidator');
const articalSchema = require("../../modles/articalModal")
const fs = require("fs")
module.exports.tagandcategoryData = async (req, res) => {
    try {
        let getTagData = await tagSchema.find({})
        let getCategoryData = await categoriSchema.find({})
        res.status(200).json({ getTagData, getCategoryData })
    } catch (error) {
        console.log(error)

    }

}
module.exports.addArticalData = async (req, res) => {
    const formDataformidble = formidable({ multiples: true });
    const { adminName, id } = req

    formDataformidble.parse(req, (err, fields, files) => {
        if (!err) {
            const { text, slug, category, tag, title } = fields;
            let validation = articalvalidetor(fields, files)
            console.log(validation)

            if (validation.validation) {
                let categoruName = category.split('-').join(" ");
                let taguName = tag.split('-').join(" ");
                let updatename = Date.now() + files.image.originalFilename
                let imagePth = __dirname + `../../../allimage/${updatename}`;
               
                fs.copyFile(files.image.filepath, imagePth, async (error) => {
                    if (error) {
                        res.status(200).json({ error: { imagefalse: "image upoload fail" } })
                        console.log(error)
                        // console.log("asdfasdfasdf")

                    }
                    else {

                        try {
                            let checkaidentity = await articalSchema.findOne({ slug })
                            if (!checkaidentity) {
                                let updatedatamongodb = await articalSchema.create({
                                    adminName,
                                    adminId: id,
                                    title,
                                    slug,
                                    category: categoruName,
                                    category_slug: category,
                                    tag: taguName,
                                    tag_slug: tag,
                                    artical_Text: text,
                                    image: updatename


                                })
                                console.log(updatedatamongodb)
                                res.status(200).json({ message: "data update success", updatedatamongodb })
                            }
                            else {
                                res.status(400).json({ message: "plase change title name" })
                                console.log("plase change title name")
                            }

                        } catch (error) {
                            console.log(error)
                            res.status(500).json("internal server error")
                        }
                    }
                })


            }
            else {
                res.status(404).json({ validation, })
            }
        }

    });

}

module.exports.get_artical_data = async (req, res) => {
    let { role, id } = req
    let { page, searchValue } = req.query
    let parPage = 2;
    let pageskip = parseInt(page - 1) * parPage
    let pageCount;
    let getseacrchdata;
    try {
        if (searchValue !== "undefined") {
            if (role = "admin") {
                pageCount = await articalSchema.find({}).countDocuments();
                getseacrchdata = await articalSchema.find({}).skip(pageskip).limit(parPage);
                //   console.log(getseacrchdatas)
                getseacrchdata = getseacrchdata.filter(ar => ar.title.toUpperCase().indexOf(searchValue.toUpperCase()) > -1)
            }
            else {
                pageCount = await articalSchema.find({}).countDocuments();
                getseacrchdata = await articalSchema.find({}).skip(pageskip).limit(parPage)
                getseacrchdata = getseacrchdata.filter(ar => ar.title.toUpperCase().indexOf(searchValue.toUpperCase()) > -1)

            }
        }
        else {
            if (role = "admin") {
                pageCount = await articalSchema.find({}).countDocuments();
                getseacrchdata = await articalSchema.find({}).skip(pageskip).limit(parPage)

                // getseacrchdata = getseacrchdata.filter(ar => ar.title.toUpperCase().indexOf(searchValue.toUpperCase()) > -1)
            }
            else {
                pageCount = await articalSchema.find({}).countDocuments();

                getseacrchdata = await articalSchema.find({}).skip(pageskip).limit(parPage)
                // getseacrchdata = getseacrchdata.filter(ar => ar.title.toUpperCase().indexOf(searchValue.toUpperCase()) > -1)

            }
        }
        res.status(200).json({
            pageCount,
            parPage,
            getseacrchdata
        })

    } catch (error) {
        console.log(error)
    }

}

module.exports.get_artical_edit_data = async (req, res) => {
    let slug = req.params.slug;
    // console.log({data})
    try {
        let get_edite_Data = await articalSchema.findOne({ slug });
        res.status(200).json({ get_edite_Data })
        console.log({ getdata: get_edite_Data })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports.update_artical_Data = async (req, res) => {
    let { id } = req.params
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (!err) {
            const { text, slug, category, tag, title } = fields;
            // const {image}=files
            let validation = articalvalidetor(fields, files)
            // console.log({ text, slug, tag, title, category })


            if (validation.validation) {
                let updatename = Date.now() + files.image.originalFilename
                let imagePth = __dirname + `../../../allimage/${updatename}`;
                
                console.log({imagePth})
                fs.copyFile(files.image.filepath, imagePth, async (error) => {
                    if (error) {
                        res.status(200).json({ error: { imagefalse: "image upoload fail" } })
                        console.log(error)
                        // console.log("asdfasdfasdf")

                    }
                    else {

                        try {

                            let updatedatamongodb = await articalSchema.findByIdAndUpdate(id, {
                                artical_Text: text,
                                slug,
                                category,
                                tag,
                                title,
                                image: imagePth


                            })

                            // console.log(updatedatamongodb)


                        } catch (error) {
                            console.log(error)
                            res.status(500).json("internal server error")
                        }
                    }
                })


            }
            else {
                res.status(404).json({ validation })
            }

        }

        else {
            console.log(err)
        }
    });
}


module.exports.delete_artical=async(req,res)=>{
let {id}=req.params;
console.log({id})
try {
    let deletes=await articalSchema.findByIdAndDelete(id);
  res.status(200).json({
    deleteSuccess:"delete is success"
  })
} catch (error) {

     res.status(200).json({
   error
  })
}
}