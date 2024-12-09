const { getCollection } = require("../db/mongo");

const collectionName = "suppliers";

const getSupplierById = async (supplierID) => {
  const collectionInstance = await getCollection(collectionName);
  const supplier = await collectionInstance.findOne({ supplierID: supplierID });
  if (!supplier) {
    console.log("Supplier not found");
  }
  return supplier;
};

const getSupplierProductsSortedDesc = async (supplierID) => {
  const collectionInstance = await getCollection("products");

  const products = await collectionInstance
    .aggregate([
      {
        $match: { supplierID: supplierID },
      },
      {
        $sort: { productName: -1 },
      },
    ])
    .toArray();
  if (!products && products.length === 0) {
    console.log("No products found for this supplier");
  }
  return products;
};

module.exports = { getSupplierById, getSupplierProductsSortedDesc };
