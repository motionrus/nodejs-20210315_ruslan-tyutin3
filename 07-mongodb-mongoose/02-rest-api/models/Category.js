const mongoose = require("mongoose");
const connection = require("../libs/connection");

function toJSON () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true,
  }
});


subCategorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

subCategorySchema.methods.toJSON = toJSON


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
  ref: "subcategory",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});


categorySchema.methods.toJSON = toJSON

const Category = connection.model("category", categorySchema);


module.exports = Category;

