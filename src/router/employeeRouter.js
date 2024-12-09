const router = require("./router");
const {
  getEmployees,
  getTopCountries,
  getHireDate,
  getEmployeeDetails,
} = require("../controller/employeeController");

router.get("/employees", async (req, res) => {
  try {
    const employees = await getEmployees();

    res.json(employees);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/top-coutries-employees", async (req, res) => {
  try {
    const topCountries = await getTopCountries();

    res.json(topCountries);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/hireDate-employee", async (req, res) => {
  try {
    const topCountries = await getHireDate();

    res.json(topCountries);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/getEmployeeDetails/:employeeID", async (req, res) => {
  try {
    const topCountries = await getEmployeeDetails(
      parseInt(req.params.employeeID)
    );

    res.json(topCountries);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

module.exports = router;
