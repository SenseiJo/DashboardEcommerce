const router = require("./router");
const {
  getOrders,
  getNbOrdersByDate,
  getAveragePriceOrders,
  getTotalPrice,
  getTotalOrder,
  getTotalOrderPerCountry,
  getTotalOrderPerEmployees,
  getTopProductsInOrders,
} = require("../controller/orderController");

router.get("/orders", async (req, res) => {
  try {
    const orders = await getOrders();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});
router.get("/nb-orders-date", async (req, res) => {
  try {
    const orders = await getNbOrdersByDate();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/average-price-orders", async (req, res) => {
  try {
    const orders = await getAveragePriceOrders();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/total-price-orders", async (req, res) => {
  try {
    const orders = await getTotalPrice();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/total-orders", async (req, res) => {
  try {
    const orders = await getTotalOrder();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/total-orders-country", async (req, res) => {
  try {
    const orders = await getTotalOrderPerCountry();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/total-orders-employees", async (req, res) => {
  try {
    const orders = await getTotalOrderPerEmployees();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/top-products-orders", async (req, res) => {
  try {
    const orders = await getTopProductsInOrders();

    res.json(orders);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

module.exports = router;
