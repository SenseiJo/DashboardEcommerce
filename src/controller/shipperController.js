const { getCollection } = require("../db/mongo");

const collectionName = "shippers";

const getShipperById = async (shipperID) => {
  const collectionInstance = await getCollection(collectionName);
  const shipper = await collectionInstance.findOne({ shipperID: shipperID });
  if (!shipper) {
    console.log("Shipper not found");
  }
  return shipper;
};

module.exports = { getShipperById };
