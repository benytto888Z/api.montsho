const  router = require('express').Router();
const uploadImage = require('../middlewares/uploadImage');
const uploadController = require('../controllers/upload.controller');
const verifyToken = require('../middlewares/verifyToken');


router.post('/upload_avatar', uploadImage, verifyToken, uploadController.uploadAvatar)

module.exports = router