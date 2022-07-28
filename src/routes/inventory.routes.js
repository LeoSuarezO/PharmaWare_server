const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventory.controller");
const { verifyToken } = require("../middlewares/authjwt");

router.post("/create_product", controller.createProduct);
router.get("/get_products", controller.getProductList);
router.post("/search_by_name", controller.searchByName);
router.post("/search_by_bar", controller.serachByBar);
router.post("/search_by_category", controller.serachByCategory);
router.post("/delete_product", controller.deleteProduct);
router.post("/update_product", controller.updateProduct);
router.post("/add_batch", controller.addBatch);
router.post("/sale", [verifyToken], controller.sales);
router.post("/get_price", controller.getPrice);
router.post("/update_price", controller.updatePrice);
router.post("/get_receipt", controller.getReceipt);
router.post("/get_item_sale", controller.getItemSale);
router.post("/get_info_product", controller.getInfoProduct);
router.post("/create_supplier", controller.createSupplier);

module.exports = router;
