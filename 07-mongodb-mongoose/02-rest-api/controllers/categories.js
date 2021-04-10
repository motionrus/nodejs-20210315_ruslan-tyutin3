const CategoryModel = require("../models/Category")

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await CategoryModel.find({}, "id title subcategories ");
  ctx.body = {categories: categories.map(category => ({
    id: category.id,
    title: category.title,
    subcategories: category.subcategories.map(subcategory => ({
      id: subcategory.id,
      title: subcategory.title
    }))
  }))};
};
