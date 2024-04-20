const express = require("express");
const Product = require("../models/product.model.js")

const router = express.Router();
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct} =  require("../controllers/product.controller.js")


router.get('/products',getProducts);
router.get("/product/:id",getProduct)
router.post("/product",createProduct)
router.put("/product/:id",updateProduct)
router.delete("/product/:id",deleteProduct)

module.exports = router;