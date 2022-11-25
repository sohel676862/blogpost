const { findOne } = require("../../modles/articalModal");
const articalSchema = require("../../modles/articalModal");
const categoriSchema = require("../../modles/catagoryModal");
const tagSchema = require("../../modles/tag_module");
module.exports.home_artical = async (req, res) => {
  let { page, searchvalue } = req.query;
  parPage = 4;
  let currentPage = parseInt(page);
  let skipPage = parseInt(currentPage - 1) * parPage;
  // console.log(currentPage)

  if (searchvalue) {
    try {
      let countArticle = await articalSchema.find({}).countDocuments();
      let homeData = await articalSchema.find({}).skip(skipPage).limit(parPage);
      res.status(200).json({
        countArticle,
        homeData,
        parPage,
      });
      console.log(homeData);
    } catch (error) {
      res.status(400).json({ error });
      console.log(error);
    }
  } else {
    try {
      let countArticle = await articalSchema.find({}).countDocuments();
      let homeData = await articalSchema.find({}).skip(skipPage).limit(parPage);
      res.status(200).json({
        countArticle,
        homeData,
        parPage,
      });
    } catch (error) {
      res.status(400).json({ error });
      console.log(error);
    }
  }
};

module.exports.tag_article_data = async (req, res) => {
  try {
    // let category=await categoriSchema.aggregate([
    //     //stage 1
    //     {
    //         $group:{_id:"catagesssdoriSlug"}}

    //     ])
    let category = await articalSchema.aggregate([
      {
        $match: {
          category: {
            $not: {
              $size: 0,
            },
          },
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    let tag = await articalSchema.aggregate([
      {
        $match: {
          tag: {
            $not: {
              $size: 0,
            },
          },
        },
      },
      {
        $unwind: "$tag",
      },
      {
        $group: {
          _id: "$tag",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      category: category,
      tag: tag,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
    console.log(error);
  }
};

module.exports.new_old_data = async (req, res) => {
  try {
    const ollartical = await articalSchema.aggregate([
      {
        $match: {},
      },
      {
        $sample: {
          size: 2,
        },
      },
    ]);
    const recentarical = await articalSchema.find({}).limit(3).sort({
      createdAt: -1,
    });
    res.status(200).json({
      ollartical,
      recentarical,
    });
    // console.log({ollartical})
  } catch (error) {
    console.log(error);
  }
};

module.exports.get_tag_category_all_data = async (req, res) => {
  let { slug, page } = req.query;
  let pageNumber = 2;
  let currentPage = parseInt(page);
  let pageSkip = (parseInt(currentPage) - 1) * pageNumber;
  try {
    let totalcategorycount = await articalSchema
      .find({ category_slug: slug })
      .countDocuments();
    let categoryartical = await articalSchema
      .find({ category_slug: slug })
      .skip(pageSkip)
      .limit(pageNumber)
      .sort({
        createdAt: -1,
      });
    // console.log(totalcategorycount, categoryartical)
    res.status(200).json({
      pageNumber,
      totalcategorycount,
      categoryartical,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.get_tag_all_data = async (req, res) => {
  let { tag, page } = req.query;

  let pageNumber = 2;
  let currentPage = parseInt(page);
  let pageSkip = (parseInt(currentPage) - 1) * pageNumber;
  try {
    let tagcount = await articalSchema.find({ tag_slug: tag }).countDocuments();
    let tagartical = await articalSchema
      .find({ tag_slug: tag })
      .skip(pageSkip)
      .limit(pageNumber)
      .sort({ createdAt: -1 });
    // console.log(tagcount, tagartical)
    res.status(200).json({
      pageNumber,
      tagartical,
      tagcount,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.artical_ditails = async (req, res) => {
  const { slug } = req.params;

  try {
    let detailsh_Article = await articalSchema.findOne({ slug });
    const related_Artical = await articalSchema.aggregate([
      {
        $match: {
          $and: [
            {
              category_slug: {
                $eq: detailsh_Article.category_slug,
              },
            },
            {
              slug: {
                $ne: slug,
              },
            },
          ],
        },
      },
      {
        $sample: {
          size: 3,
        },
      },
    ]);

    const readMore = await articalSchema.aggregate([
      {
        $match: {
          $and: [
            {
              category_slug: {
                $eq: detailsh_Article.category_slug,
              },
            },
            {
              slug: {
                $ne: slug,
              },
            },
          ],
        },
      },
      {
        $sample: {
          size: 1,
        },
      },
    ]);

    const moreTag = await articalSchema.distinct("tag_slug", {
      tag_slug: {
        $eq: detailsh_Article.tag_slug,
      },
    });

    res.status(200).json({
      detailsh_Article,
      readMore: {
        title: readMore.length > 0 ? readMore[0].title : "",
        slug: readMore.length > 0 ? readMore[0].slug : "",
      },
      related_Artical,
      moreTag,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports.artical_like_dislike = async (req, res) => {
  let { slug } = req.params;
  let { userId, username, loginMethod, role } = req;

  try {
    let findartiacldata = await articalSchema
      .findOne({ slug })
      .select({ like: 1, dislike: 1, like_dislike: 1 });
    const check_user = findartiacldata.like_dislike.find(
      (u) => u.like_dislike_id === userId
    );
    if (check_user) {
      if (check_user.like_or_dislike === "like") {
        res.status(200).json({
          like_status: "like",
          dislike_status: "",
          like: findartiacldata.like,
          dislike: findartiacldata.dislike,
        });
      } else {
        res.status(200).json({
          like_status: "",
          dislike_status: "dislike",
          like: findartiacldata.like,
          dislike: findartiacldata.dislike,
        });
      }
    } else {
      res.status(200).json({
        like_status: "",
        dislike_status: "",
        like: findartiacldata.like,
        dislike: findartiacldata.dislike,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(505).json({
      message: error,
    });
  }
};

module.exports.user_artical_like = async (req, res) => {
  let { articalId, dislike_status, like_status } = req.body;
  console.log(dislike_status,like_status)
  let { username, userId, loginMethod, role } = req;
  console.log({ dislike_status, like_status });
  try {
    let { like, dislike, slug } = await articalSchema.findOne({
      _id: articalId,
    });
    if (!dislike_status && !like_status) {
      let update_like = await articalSchema.updateOne(
        { _id: articalId },
        {
          like: like + 1,
          $push: {
            like_dislike: {
              like_or_dislike: "like",
              like_dislike_id: userId,
            },
          },
        }
      );
      console.log("first");
      res.status(200).json({ likemessageSuccess: "you like this article" });
    } else if (like_status && !dislike_status) {
      let likeundo = await articalSchema.updateOne(
        { _id: articalId },
        {
          like: like - 1,
          $pull: {
            like_dislike: {
              like_dislike_id: userId,
            },
          },
        }
      );
      console.log("undo like")
      res.status(200).json({
        likemessageSuccess: "like  undo",
      });
    } else if (!like_status && dislike_status) {
      let dislikeupdate = await articalSchema.updateOne(
        {
          _id: articalId,
          "like_dislike.like_dislike_id": userId,
        },
        {
          like: like + 1,
          dislike: dislike - 1,
          $set: {
            "like_dislike.$.like_or_dislike": "like",
          },
        }
      );
      console.log("dislike_status lest");
      res.status(200).json({ likemessageSuccess: "you like this article" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.user_dislike = async (req, res) => {
  let { articalId, dislike_status, like_status } = req.body;
  let { username, userId, loginMethod, role } = req;
  try {
    let { slug, like, dislike } = await articalSchema.findOne({
      _id: articalId,
    });
    console.log({dislike,dislike_status, like_status} )
    if (!like_status && !dislike_status) {
      let updateDislike = await articalSchema.updateOne(
        { _id: articalId },
        {
            dislike: dislike + 1,

          $push: {
            like_dislike: {
              like_or_dislike: "dislike",
              like_dislike_id: userId,
            },
          },
        }
      );
console.log("first")
      res.status(200).json({
        dislikemessage: "your dislike is succes",
      });
    } else if (!like_status && dislike_status) {
      let updateDislike = await articalSchema.updateOne(
        {_id: articalId },
        {
            dislike: dislike - 1,
            $pull: {
              like_dislike: {
                like_dislike_id: userId,
              },
            },
        }
      );
      console.log("undo message")
      res.status(200).json({
        dislikemessage: "undo message",
      });
    } else if (like_status && !dislike_status) {
      let data = await articalSchema.updateOne(
        {
          _id: articalId,
          "like_dislike.like_dislike_id": userId,
        },
        {
          like: like + 1,
          dislike: dislike - 1,
          $set: {
            "like_dislike.$.like_or_dislike": "dislike",
          },
        }
      );
      console.log("your dislike is succes lest")
      res.status(200).json({
        dislikemessage: "your dislike is succes",
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error,
    });
  }
};
