const { getCollection } = require("../db/mongo");

const collectionName = "customers";

const getCustomerById = async (customerID) => {
  const collectionInstance = await getCollection(collectionName);
  const customer = await collectionInstance.findOne({ customerID: customerID });
  if (!customer) {
    console.log("Customer not found");
  }
  return customer;
};

const getCustomerOrdersSortedDateAsc = async (customerID) => {
  const collectionInstance = await getCollection("orders");

  const orders = await collectionInstance
    .aggregate([
      {
        $match: { customerID: customerID },
      },
      {
        $sort: { orderDate: 1 },
      },
    ])
    .toArray();

  if (!orders || orders.length === 0) {
    console.log("No orders found for this customer");
  }
  return orders;
};

const getCustomers = async () => {
  const collectionInstance = await getCollection(collectionName);
  const customers = await collectionInstance.find().toArray();

  if (!customers) {
    console.log("Customers not found");
  }
  console.log("ca passe par customers");
  console.log(customers);

  return customers;
};

const getTopCustomers = async () => {
  const ordersCollection = await getCollection("orders");

  // Aggregation to find top customers
  const topCustomers = await ordersCollection
    .aggregate([
      {
        $group: {
          _id: "$customerID", // Group by customerId
          totalOrders: { $sum: 1 }, // Count the number of orders
        },
      },
      { $sort: { totalOrders: -1 } }, // Sort by totalOrders descending
      { $limit: 3 }, // Limit to top 3 customers
      {
        $lookup: {
          from: collectionName, // Join with customers collection
          localField: "_id", // Match _id from the group with customerId
          foreignField: "customerID",
          as: "customerDetails",
        },
      },
    ])
    .toArray();

  return topCustomers;
};

const getTopCountries = async () => {
  const customersCollection = await getCollection("customers");

  const topCountries = await customersCollection
    .aggregate([
      {
        $group: {
          _id: "$country",
          totalCustomers: { $sum: 1 },
        },
      },
    ])
    .toArray();

  return topCountries;
};

module.exports = {
  getCustomerById,
  getCustomerOrdersSortedDateAsc,
  getCustomers,
  getTopCustomers,
  getTopCountries,
};
