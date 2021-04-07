const {Category} = require("../models/Category")
module.exports.categoryList = async function categoryList(ctx, next) {
  ctx.body = {
    categories: await Category.find({})
      .populate('subcategories', 'id title -category')
  };
};
