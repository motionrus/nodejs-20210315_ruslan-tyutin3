const mongoose = require("mongoose");
const connection = require("../libs/connection");

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
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true,
  }
});

categorySchema.virtual("subcategories", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "SubCategory",
  justOne: false,
});

categorySchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Category = connection.model("Category", categorySchema);
const subCategory = connection.model("SubCategory", subCategorySchema);

module.exports = {subCategory, Category};

