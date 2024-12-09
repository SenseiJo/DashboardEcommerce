const { getCollection } = require("../db/mongo");

const collectionName = "regions";

const getRegionById = async (regionID) => {
  const collectionInstance = await getCollection(collectionName);
  const region = await collectionInstance.findOne({ regionID: regionID });
  if (!region) {
    console.log("Region not found");
  }
  return region;
};

module.exports = { getRegionById };
