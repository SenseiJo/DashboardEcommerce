const { getCollection } = require("../db/mongo");

const collectionName = "categories";

const getCategoryById = async (categoryID) => {
  const collectionInstance = await getCollection(collectionName);
  const category = await collectionInstance.findOne({ categoryID: categoryID });
  if (!category) {
    console.log("Category not found");
  }
  return category;
};

module.exports = { getCategoryById };
