const router = require("express").Router();
const {verifyToken} = require("../middlewares/verifyToken");
const cartController = require('../controllers/cart.controller');



//CREATE
router.post("/",cartController.createCart);

//UPDATE
router.put("/:id",cartController.updateCart);
//DELETE
router.delete("/:id",cartController.deleteCart);
//GET USER CART
router.get("/find/:userId",cartController.getUserCart);
//GET ALL CARTS FROM ALL USERS
router.get("/",cartController.getAllUsersCarts);



/*
//CREATE
router.post("/",verifyToken,cartController.createCart);

//UPDATE
router.put("/:id",verifyTokenAndAuthorization,cartController.updateCart);
//DELETE
router.delete("/:id",verifyTokenAndAuthorization,cartController.deleteCart);
//GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization,cartController.getUserCart);
//GET ALL CARTS FROM ALL USERS
router.get("/",verifyTokenAndAdmin,cartController.getAllUsersCarts);*/

module.exports = router;