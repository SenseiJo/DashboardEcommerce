const { getCollection } = require("../db/mongo");

const collectionName = "territories";

const getTerritoryById = async (territoryID) => {
  const collectionInstance = await getCollection(collectionName);
  const territory = await collectionInstance.findOne({
    territoryID: territoryID,
  });
  if (!territory) {
    console.log("Territory not found");
  }
  return territory;
};

module.exports = { getTerritoryById };
