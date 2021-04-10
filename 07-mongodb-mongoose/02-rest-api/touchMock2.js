const Product = require("./models/Product");
const Category = require("./models/Category");
const mongoose = require("mongoose");
const connection = require("./libs/connection");
const ObjectId = require('mongodb').ObjectID;



const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const SubCategory = connection.model("SubCategory", subCategorySchema);

async function create() {
  const subcategory = await new SubCategory({title: "Прогулки и детская комната"});

  const category = new Category({
    title: "Детские товары и игрушки1",
    subcategories: [subcategory]
  });

  const product = new Product({
    title: "Product1",
    images: ["image1"],
    category: category,
    subcategory: subcategory,
    price: 10,
    description: "Description1"
  });
  await product.save();
}

async function select() {
  const result = await Product.find({subcategory: ObjectId("6071abe09ffa4dcef36b9304")})
  console.log(result)
}

select().then(() => mongoose.disconnect())
