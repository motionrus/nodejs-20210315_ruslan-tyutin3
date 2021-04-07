const mongoose = require("mongoose");
const {Schema} = mongoose;

const dbName = "test";

const url = `mongodb://root:example@localhost:27017/${dbName}?authSource=admin`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("debug", true);


const subCategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  }
});

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("category", categorySchema);
const SubCategory = mongoose.model("subcategory", subCategorySchema);
Category.deleteMany();

const subCategories = [
  {
    "_id": "5d0ddb2a2b873c70961f6fba",
    "title": "Прогулки и детская комната",
    "category": "5d0ddb2a2b873c70961f6fb4"
  },
  {
    "_id": "5d0ddb2a2b873c70961f6fb9",
    "title": "Кормление и гигиена",
    "category": "5d0ddb2a2b873c70961f6fb4"
  },
  {
    "_id": "5d0ddb2a2b873c70961f6fb8",
    "title": "Игрушки и развлечения",
    "category": "5d0ddb2a2b873c70961f6fb4"
  },
  {
    "_id": "5d0ddb2a2b873c70961f6fb7",
    "title": "Активный отдых и улица",
    "category": "5d0ddb2a2b873c70961f6fb4"
  },
  {
    "_id": "5d0ddb2a2b873c70961f6fb6",
    "title": "Радиоуправляемые модели",
    "category": "5d0ddb2a2b873c70961f6fb4"
  },
  {
    "_id": "5d0ddb2a2b873c70961f6fb5",
    "title": "Школьные товары",
    "category": "5d0ddb2a2b873c70961f6fb4"
  }
];

const categories = [{
  "_id": "5d0ddb2a2b873c70961f6fb4",
  "title": "Детские товары и игрушки",
}];


(async function () {
  await SubCategory.deleteMany();
  await Category.deleteMany()



  const subCategorySchemas = subCategories.map(subCategory => new SubCategory(subCategory))
  await SubCategory.insertMany(subCategorySchemas)

  for await (let category of categories) {
    category = new Category(category);
    await category.save();
  }

  await mongoose.disconnect();
})();
