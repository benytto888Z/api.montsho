const router = require("express").Router();
const stripeController = require('../controllers/stripe.controller');


router.post("/payment",stripeController.stripePayment);

module.exports = router;