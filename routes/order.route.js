const router = require("express").Router();
const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const orderController = require('../controllers/order.controller');


//CREATE
// router.post("/",verifyToken,orderController.createOrder);
router.post("/",orderController.createOrder);

//UPDATE
// router.put("/:id",verifyTokenAndAdmin,orderController.updateOrder);
router.put("/:id",orderController.updateOrder);
//DELETE
// router.delete("/:id",verifyTokenAndAuthorization,orderController.deleteOrder);
router.delete("/:id",orderController.deleteOrder);
//GET USER ORDERS
// router.get("/find/:userId",verifyTokenAndAuthorization,orderController.getUserOrders);
router.get("/find/:userId",orderController.getUserOrders);
//GET ALL ORDERS FROM ALL USERS
// router.get("/",verifyTokenAndAdmin,orderController.getAllUsersOrders);
router.get("/",orderController.getAllUsersOrders);
//GET MONTHLY INCOME
// router.get("/income",verifyTokenAndAdmin,orderController.getMonthlyIncome);
router.get("/income",orderController.getMonthlyIncome);

module.exports = router;