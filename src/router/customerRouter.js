const router = require("./router");
const {
  getCustomerById,
  getCustomerOrdersSortedDateAsc,
  getCustomers,
  getTopCustomers,
  getTopCountries,
} = require("../controller/customerController");

router.get("/customer_order/:customerID", async (req, res) => {
  const customerID = req.params.customerID;
  const customer = await getCustomerOrdersSortedDateAsc(customerID);
  res.send(customer);
});

router.get("/customers", async (req, res) => {
  try {
    const customers = await getCustomers();

    res.json(customers);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/top-customers", async (req, res) => {
  try {
    const topCustomers = await getTopCustomers();
    res.status(200).json(topCustomers);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/top-countries-customers", async (req, res) => {
  try {
    const topCountries = await getTopCountries();
    res.status(200).json(topCountries);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
