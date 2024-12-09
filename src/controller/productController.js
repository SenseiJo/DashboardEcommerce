const { getCollection } = require("../db/mongo");

const collectionName = "products";

const getProducts = async () => {
  const collectionInstance = await getCollection(collectionName);
  const product = await collectionInstance.find({}).toArray();
  if (!product) {
    console.log("error not found");
  }
  return product;
};

const getProductById = async (productID) => {
  const collectionInstance = await getCollection(collectionName);
  const product = await collectionInstance.findOne({ productID: productID });
  if (!product) {
    console.log("error not found");
  }
  return product;
};

module.exports = { getProducts, getProductById };
