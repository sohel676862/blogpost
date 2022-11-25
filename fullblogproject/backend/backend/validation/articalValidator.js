module.exports.articalvalidetor = (data, file) => {
    const { text, slug, category, tag, title } = data;
    let error = {};
    if (!title) {
        error.title = "Please provise title"
    }
    if (!text) {
        error.text = "Please provise text "
    }
    if (!category) {
        error.category = "Please provise category"
    }
    if (!slug) {
        error.slug = "Please provise slug"
    }
    if (!tag) {
        error.tag = "Please provise tag"
    }
    if (Object.keys(file).length === 0) {
        error.image = "Please provise image"
    }

    if (Object.keys(error).length === 0) {
        return {
            validation: true
        }
    }
    else {
        return {
            error: {
                validation: false,
                error: error
            }
        }
    }


}