const router = require("express").Router();
const authController = require('../controllers/auth.controller');
const authAdmin = require("../middlewares/authAdmin");
const verifyToken = require('../middlewares/verifyToken');

// auth

router.post("/register",authController.signUp);
router.post("/activation",authController.activateEmail);
router.post("/login",authController.signIn);
router.get("/logout",authController.logout);
router.post("/refreshtoken",authController.getAccessToken);
router.post("/forgotpass",authController.forgotPassword);
router.post("/resetpass",verifyToken,authController.resetPassword);


router.patch("/update/updateUser",verifyToken,authController.updateUserInfos);
router.patch("/update_all/:id",verifyToken, authAdmin,authController.updateUsersRole);


module.exports = router;