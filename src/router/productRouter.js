const router = require("./router");
const {
  getProductById,
  getProducts,
} = require("../controller/productController");

router.get("/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send("Error getting products");
  }
});

router.get("/product/:productID", async (req, res) => {
  const productID = parseInt(req.params.productID);
  try {
    const product = await getProductById(productID);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    res.status(500).send("Error getting product");
  }
});

module.exports = router;
