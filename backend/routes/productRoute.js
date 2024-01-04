const createProduct = require("../controllers/productRouteController");
const protectedRoute = require("../middleware/authMiddleware");
const { upload } = require('../utils/fileUpload');

const router = require("express").Router();

router.post("/", protectedRoute, upload.single("image"), createProduct);

module.exports = router