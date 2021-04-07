const mongoose = require("mongoose");

const dbName = "test";
const {Category, subCategory} = require("./models/Category")
const url = `mongodb://root:example@localhost:27017/${dbName}?authSource=admin`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("debug", true);


(async function () {
  await subCategory.deleteMany();
  await Category.deleteMany();

  const category = new Category({
    "_id": "5d0ddb2a2b873c70961f6fb4",
    "title": "Детские товары и игрушки",
  });
  await category.save();

  const subCategorySchemas = [
    {
      "_id": "5d0ddb2a2b873c70961f6fba",
      "title": "Прогулки и детская комната",
      "category": category
    },
    {
      "_id": "5d0ddb2a2b873c70961f6fb9",
      "title": "Кормление и гигиена",
      "category": category
    },
    {
      "_id": "5d0ddb2a2b873c70961f6fb8",
      "title": "Игрушки и развлечения",
      "category": category
    },
    {
      "_id": "5d0ddb2a2b873c70961f6fb7",
      "title": "Активный отдых и улица",
      "category": category
    },
    {
      "_id": "5d0ddb2a2b873c70961f6fb6",
      "title": "Радиоуправляемые модели",
      "category": category
    },
    {
      "_id": "5d0ddb2a2b873c70961f6fb5",
      "title": "Школьные товары",
      "category": category
    }
  ];
  await subCategory.insertMany(subCategorySchemas);
  await mongoose.disconnect();
})();
