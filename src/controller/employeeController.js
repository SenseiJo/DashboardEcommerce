const { getCollection } = require("../db/mongo");

const collectionName = "employees";

const getEmployeeById = async (employeeID) => {
  const collectionInstance = await getCollection(collectionName);
  const employee = await collectionInstance.findOne({ employeeID: employeeID });
  if (!employee) {
    console.log("Employee not found");
  }
  return employee;
};

const getEmployees = async () => {
  const collectionInstance = await getCollection(collectionName);
  const employees = await collectionInstance
    .find(
      {},
      {
        projection: {
          extension: 0,
          photo: 0,
          notes: 0,
          photoPath: 0,
          reportsTo: 0,
          _id: 0,
        },
      }
    )
    .toArray();
  if (!employees) {
    console.log("Employee not found");
  }
  return employees;
};

const getTopCountries = async () => {
  const collectionInstance = await getCollection(collectionName);
  const topCountries = await collectionInstance
    .aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  return topCountries;
};

const getHireDate = async () => {
  const collectionInstance = await getCollection(collectionName);
  const topCountries = await collectionInstance
    .aggregate([
      {
        $group: {
          _id: "$hireDate",
          totalEmployee: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ])
    .toArray();

  return topCountries;
};

const getEmployeeDetails = async (employeeID) => {
  const collectionInstance = await getCollection(collectionName);
  const employeeDetails = await collectionInstance
    .aggregate([
      {
        $match: {
          employeeID,
        },
      },
      {
        $lookup: {
          from: "employee_territories", // Jointure avec la collection `employee_territories`
          localField: "employeeID", // Champ de la collection `employees`
          foreignField: "employeeID", // Champ de la collection `employee_territories`
          as: "territories", // Le résultat est un tableau
        },
      },
      {
        $lookup: {
          from: "territories", // Jointure avec la collection `territories`
          localField: "territories.territoryID", // Champ de `territories` dans `employees`
          foreignField: "territoryID", // Champ dans `territories`
          as: "territoryDetails", // Le résultat est un tableau
        },
      },
      {
        $lookup: {
          from: "regions", // Jointure avec la collection `regions`
          localField: "territoryDetails.regionID", // Champ de `territoryDetails` dans `employees`
          foreignField: "regionID", // Champ dans `regions`
          as: "regionDetails", // Le résultat est un tableau
        },
      },
    ])
    .toArray();

  return employeeDetails; // Retourne les résultats de l'agrégation
};

module.exports = {
  getEmployeeById,
  getEmployees,
  getTopCountries,
  getHireDate,
  getEmployeeDetails,
};
