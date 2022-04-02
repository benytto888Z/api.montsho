const router = require("express").Router();
const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const productController = require('../controllers/product.controller');


//CREATE
// router.post("/",verifyTokenAndAdmin,productController.createPost);
router.post("/",productController.createPost);

//UPDATE
// router.put("/:id",verifyTokenAndAdmin,productController.updatePost);
router.put("/:id",productController.updatePost);
//DELETE
// router.delete("/:id",verifyTokenAndAdmin,productController.deleteProduct);
router.delete("/:id",productController.deleteProduct);
//GET PRODUCT
router.get("/find/:id",productController.getOneProduct);
//GET ALL PRODUCTS
router.get("/",productController.getAllProducts);

module.exports = router;