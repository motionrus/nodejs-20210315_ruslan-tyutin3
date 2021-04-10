const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectID;

function isValid(pathname) {
  return (pathname.split("/").length === 4);
}

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;
  if (!subcategory) return next();
  const product = await Product.findOne({subcategory: ObjectId(subcategory)});

  ctx.body = {
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description,
  };
};

module.exports.productList = async function productList(ctx, next) {
  ctx.body = (await Product.find({})).map(product => ({
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description,
  }));
};

module.exports.productById = async function productById(ctx, next) {
  if (!isValid(ctx.request.url)) {
    ctx.response.status = 400;
    next();
  }
  const productId = ctx.req.url.split("/").pop();
  const product = await Product.findOne({_id: productId});
  if (!product) {
    ctx.code = 404;
    return;
  }
  ctx.body = product;
};

