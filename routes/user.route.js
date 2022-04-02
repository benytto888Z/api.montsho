const router = require("express").Router();
// const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken");

const userController = require('../controllers/user.controller');
const verifyToken = require("../middlewares/verifyToken");
const authAdmin = require("../middlewares/authAdmin");
const uploadImage = require('../middlewares/uploadImage');
const uploadController = require('../controllers/upload.controller')

// router.get("/find/:id", verifyTokenAndAdmin,userController.getUser);
router.get("/find/:id",userController.getUser);
router.get("/infos",verifyToken,userController.getUserInfos);
// get all USERS
// router.get("/", verifyTokenAndAdmin,userController.getAllUsers);
router.get("/",userController.getAllUsers);
router.get("/all_infos",verifyToken,authAdmin,userController.getAllUsersInfos);
// get USER STATS
// router.get("/stats", verifyTokenAndAdmin,userController.getUserStats);
router.get("/stats",userController.getUserStats);
//UPDATE USER PROFIL
// router.put("/:id",verifyTokenAndAuthorization,userController.updateProfil);
router.put("/:id",userController.updateProfil);

// DELETE USER --- Admin role
// router.delete("/:id", verifyTokenAndAuthorization,userController.deleteUser);
router.delete("/:id",userController.deleteUser);


// router.post('/upload_avatar', uploadImage, uploadController.uploadAvatar)









module.exports = router;