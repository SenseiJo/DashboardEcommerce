const router = require("./router");
const {
  getSupplierById,
  getSupplierProductsSortedDesc,
} = require("../controller/supplierController");

router.get("/supplier_product/:supplierId", async (req, res) => {
  const supplierId = parseInt(req.params.supplierId);
  const supplier = await getSupplierProductsSortedDesc(supplierId);
  res.send(supplier);
});

module.exports = router;
