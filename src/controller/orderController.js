const { getCollection } = require("../db/mongo");

const collectionName = "orders";

const getOrderById = async (orderID) => {
  const collectionInstance = await getCollection(collectionName);
  const order = await collectionInstance.findOne({ orderID: orderID });
  if (!order) {
    console.log("Order not found");
  }
  return order;
};

const getNbOrdersByDate = async () => {
  const collectionInstance = await getCollection(collectionName);
  const orders = await collectionInstance
    .aggregate([
      {
        $group: {
          _id: "$orderDate",
          total: {
            $sum: 1,
          },
        },
      },
    ])
    .toArray();
  if (!orders) {
    console.log("Order not found");
  }
  return orders;
};

const getAveragePriceOrders = async () => {
  const collectionInstance = await getCollection(collectionName);
  const orders = await collectionInstance
    .aggregate([
      {
        $lookup: {
          from: "order_details",
          localField: "orderID",
          foreignField: "orderID",
          as: "orderDetails",
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: null,
          averagePrice: {
            $avg: {
              $multiply: [
                "$orderDetails.quantity",
                "$orderDetails.unitPrice",
                { $subtract: [1, "$orderDetails.discount"] },
              ],
            },
          },
        },
      },
    ])
    .toArray();
  if (!orders) {
    console.log("Order not found");
  }
  return orders[0].averagePrice;
};

const getTotalPrice = async () => {
  const collectionInstance = await getCollection(collectionName);
  const orders = await collectionInstance
    .aggregate([
      {
        $lookup: {
          from: "order_details",
          localField: "orderID",
          foreignField: "orderID",
          as: "orderDetails",
        },
      },
      { $unwind: "$orderDetails" },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: {
              $multiply: [
                "$orderDetails.quantity",
                "$orderDetails.unitPrice",
                { $subtract: [1, "$orderDetails.discount"] },
              ],
            },
          },
        },
      },
    ])
    .toArray();
  if (!orders) {
    console.log("Order not found");
  }
  return orders[0].totalPrice;
};

const getTotalOrder = async () => {
  const collectionInstance = await getCollection(collectionName);
  const orders = await collectionInstance
    .aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
        },
      },
    ])
    .toArray();
  if (!orders) {
    console.log("Order not found");
  }
  return orders[0].totalOrders;
};

const getTotalOrderPerCountry = async () => {
  const collectionInstance = await getCollection(collectionName);
  const orders = await collectionInstance
    .aggregate([
      {
        $group: {
          _id: "$shipCountry",
          totalOrders: { $sum: 1 },
        },
      },
    ])
    .toArray();
  if (!orders) {
    console.log("Order not found");
  }
  return orders;
};

const getTotalOrderPerEmployees = async () => {
  const collectionInstance = await getCollection(collectionName);
  const orders = await collectionInstance
    .aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "employeeID",
          foreignField: "employeeID",
          as: "employee",
        },
      },
      {
        $unwind: {
          path: "$employee",
        },
      },
      {
        $group: {
          _id: "$employeeID",
          totalOrders: { $sum: 1 },
          employeeDetails: { $first: "$employee" }, // Inclure les détails de l'employé
        },
      },
    ])
    .toArray();
  if (!orders) {
    console.log("Order not found");
  }
  return orders;
};

const getTopProductsInOrders = async () => {
  const collectionInstance = await getCollection("orders");
  const topProducts = await collectionInstance
    .aggregate([
      {
        $lookup: {
          from: "order_details",
          localField: "orderID",
          foreignField: "orderID",
          as: "orderDetails",
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $lookup: {
          from: "products",
          localField: "orderDetails.productID",
          foreignField: "productID",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.productID",
          productName: { $first: "$product.productName" },
          totalQuantity: { $sum: "$orderDetails.quantity" },
          totalRevenue: {
            $sum: {
              $multiply: ["$orderDetails.quantity", "$product.unitPrice"],
            },
          },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 3,
      },
    ])
    .toArray();
  console.log(topProducts);

  if (!topProducts) {
    console.log("No products found");
  }
  return topProducts;
};

const getOrders = async () => {
  const collectionInstance = await getCollection(collectionName);
  const orders = await collectionInstance.find().toArray();
  if (!orders) {
    console.log("Order not found");
  }
  return orders;
};

module.exports = {
  getOrderById,
  getOrders,
  getNbOrdersByDate,
  getAveragePriceOrders,
  getTotalPrice,
  getTotalOrder,
  getTotalOrderPerCountry,
  getTotalOrderPerEmployees,
  getTopProductsInOrders,
};
