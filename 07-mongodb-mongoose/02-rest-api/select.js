const connection = require("./libs/connection");
const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subcategories: [subCategorySchema],
});

const CategoryModel = connection.model("Category", categorySchema);

function serializer(model) {
  return {};
}

;(async function run() {
  const categories = await CategoryModel.find({}, "id title subcategories ");
  console.log(categories.map(category => ({
    id: category.id,
    title: category.title,
    subcategories: category.subcategories.map(subcategory => ({
      id: subcategory.id,
      title: subcategory.title
    }))
  })));
})();
