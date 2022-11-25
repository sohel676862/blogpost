const commnetSchema = require("../../modles/commentModal")
const notificationScema=require("../../modles/notifacationModal")
module.exports.comment_post_data = async (req, res) => {
    let { articleId, userId, userName, commenttext } = req.body;


    try {
        let commnetr_post = await commnetSchema.create({
            articleId,
            userName,
            userId,
            commenttext,


        })

        let notifiacation=await notificationScema.create({
            useerId:userId,
            subject:`${userName} comment your article`,
            articleId

        })
        console.log(notifiacation)
        res.status(200).json({
            commentsucces: "your comment is successful"
        })
        // console.log(commnetr_post)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            error
        })
    }

}

module.exports.get_comment_post = async (req, res) => {
    let { articleId } = req.params;

    try {
        let get_commnet = await commnetSchema.find({ articleId });
        res.status(200).json({
            get_commnet
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.reply_post = async (req, res) => {
    let { comentId, userId, userName, replyInput } = req.body

    try {
        // let reply_test=await commnetSchema.findById({_id:comentId})
        let reply_commnet = await commnetSchema.updateOne({ _id: comentId },

            {
                $push: {
                    repliCOmment: {
                        replyName: userName,
                        replyId: userId,
                        replyComment: replyInput,
                        replyTime: new Date()
                    }
                }
            }
        )
        res.status(200).json({
            reply: "reply message success"
        })
    } catch (error) {
        console.log(error)
    }


}

module.exports.commnet_delete_main_user = async (req, res) => {
    const { commentId, userId, articleId } = req.body
    console.log(commentId, userId)
    try {
        let findUser = await commnetSchema.findOne({ _id: commentId });
        if (findUser?.userId === userId) {
            let comment_delete = await commnetSchema.findOneAndDelete({ _id: commentId })
            res.status(202).json({
                commentsucces: "delete messege success"
            })
        }
        else {
            res.status(404).json({
                errorUser: "user is not log in"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(505).json({
            deleteError: error
        })
    }
}

module.exports.reply_commnet_delete = async (req, res) => {
    let { commnetId, replyId, userId, articleId } = req.body;
    console.log({ commnetId, replyId, userId, articleId })
    try {
        let deletereplyCommnet = await commnetSchema.updateOne({ _id: commnetId },
            {
                $pull: {
                    repliCOmment: {

                        _id: replyId

                    }
                }
            })
res.status("200").json({
    commentsucces:"delete reply comment success"
})
    } catch (error) {
        console.log(error)
    }
}

