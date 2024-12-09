const { getCollection } = require("../db/mongo");

const collectionName = "employee_territories";

const getEmployeeTerritoryById = async (employeeTerritoryID) => {
  const collectionInstance = await getCollection(collectionName);
  const employeeTerritory = await collectionInstance.findOne({
    employeeTerritoryID: employeeTerritoryID,
  });
  if (!employeeTerritory) {
    console.log("Employee Territory not found");
  }
  return employeeTerritory;
};

module.exports = { getEmployeeTerritoryById };
