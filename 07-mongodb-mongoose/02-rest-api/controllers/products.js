const Product = require("../models/Product");
const mongoose = require("mongoose");


function isValid(pathname) {
  if (pathname.split("/").length === 4) {
    const objId = pathname.split("/").pop();
    return mongoose.Types.ObjectId.isValid(objId);
  }
  return false;
}

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;
  if (!subcategory) return next();
  const products = await Product.find({subcategory: mongoose.Types.ObjectId(subcategory)});

  ctx.body = {
    products: products.map(product => ({
      id: product.id,
      title: product.title,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description,
    }))
  };
};

module.exports.productList = async function productList(ctx, next) {
  const products = (await Product.find({})).map(product => ({
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description,
  }));
  ctx.body = {
    products: products
  }
};

module.exports.productById = async function productById(ctx, next) {
  if (!isValid(ctx.request.url)) {
    ctx.response.status = 400;
    return next();
  }
  const productId = ctx.req.url.split("/").pop();
  const product = await Product.findOne({_id: productId});
  if (!product) {
    ctx.code = 404;
    return;
  }
  ctx.body = {
    product: {
      id: product.id,
      title: product.title,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description,
    }
  };
};

