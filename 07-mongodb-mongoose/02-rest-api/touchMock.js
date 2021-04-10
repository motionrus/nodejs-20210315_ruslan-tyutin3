const connection = require("./libs/connection");
const mongoose = require("mongoose")

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
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

categorySchema.virtual("id", function () {
  return this._id.toHexString();
});

const categoryModel = connection.model("Category", categorySchema);
const subCategoryModel = connection.model("SubCategory", subCategorySchema);


const subCategoryArray = [
  new subCategoryModel({title: "Прогулки и детская комната"}),
  new subCategoryModel({title: "Кормление и гигиена"}),
  new subCategoryModel({title: "Игрушки и развлечения"}),
  new subCategoryModel({title: "Активный отдыхх и улица"}),
  new subCategoryModel({title: "Радиоуправляемые модели"}),
  new subCategoryModel({title: "Школьные товары"}),
];

const category = new categoryModel({
  title: "Детские товары и игрушки1",
  subcategories: subCategoryArray
});

;(async function run() {
  await categoryModel.deleteMany();
  await category.save();
  console.log(categoryModel.id);
})();
